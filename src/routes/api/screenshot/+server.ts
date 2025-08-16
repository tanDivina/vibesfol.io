import { error, type RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { chromium } from 'playwright';

const supabaseServiceRole = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE);

export const POST: RequestHandler = async ({ request, locals: { safeGetSession } }) => {
  let browser;
  
  try {
    const { session } = await safeGetSession();
    if (!session) {
      return error(401, 'Unauthorized');
    }
    const userId = session.user.id;

    const { url } = await request.json();

    if (!url) {
      return error(400, 'URL is required');
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return error(400, 'Invalid URL format');
    }

    // Launch a headless browser with optimized settings
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Set timeout and navigate to the URL
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // Wait a bit more for dynamic content to load
    await page.waitForTimeout(2000);

    // Take a screenshot with optimized settings
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false, // Use viewport screenshot for better performance
      clip: { x: 0, y: 0, width: 1200, height: 800 }
    });

    // Close the browser
    await browser.close();
    browser = null;

    // Generate a unique filename
    const fileName = `screenshots/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseServiceRole.storage
      .from('project-screenshots')
      .upload(fileName, screenshot, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading screenshot:', uploadError);
      return error(500, 'Failed to upload screenshot');
    }

    // After successful upload, trigger gamification checks
    const { gamificationService } = await import('$lib/gamification');
    await gamificationService.calculatePortfolioScore(userId);
    await gamificationService.checkAchievements(userId);

    // Get the public URL
    const { data: publicUrlData } = supabaseServiceRole.storage
      .from('project-screenshots')
      .getPublicUrl(uploadData.path);

    return new Response(JSON.stringify({ url: publicUrlData.publicUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    // Ensure browser is closed even if there's an error
    if (browser) {
      try {
        await browser.close();
      } catch (closeErr) {
        console.error('Error closing browser:', closeErr);
      }
    }
    
    console.error('Error generating screenshot:', err);
    
    // Provide more specific error messages
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (errorMessage.includes('timeout')) {
      return error(408, 'Screenshot generation timed out. The website may be slow to load.');
    } else if (errorMessage.includes('net::ERR_NAME_NOT_RESOLVED')) {
      return error(400, 'Website not found. Please check the URL.');
    } else if (errorMessage.includes('net::ERR_CONNECTION_REFUSED')) {
      return error(400, 'Cannot connect to the website. Please check the URL.');
    }
    
    return error(500, 'Failed to generate screenshot. Please try again.');
  }
};
