import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import { Client } from "screenshotone-api-sdk"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async () => {
  try {
    // Test URL for screenshot
    const testUrl = "https://example.com"
    
    // Check if ScreenshotOne API key is configured
    if (!env.PRIVATE_SCREENSHOTONE_API_KEY) {
      return json({
        status: "warning",
        message: "ScreenshotOne API key not configured",
        fallback: "Using placeholder images",
        testUrl,
        apiKeyConfigured: false
      })
    }

    try {
      // Initialize ScreenshotOne client
      const client = new Client(env.PRIVATE_SCREENSHOTONE_API_KEY)

      // Generate screenshot URL with optimized settings
      const screenshotUrl = client.generateTakeScreenshotURL({
        url: testUrl,
        viewport_width: 1200,
        viewport_height: 800,
        device_scale_factor: 1,
        format: "jpg",
        image_quality: 80,
        block_ads: true,
        block_cookie_banners: true,
        block_trackers: true,
        cache: true,
        cache_ttl: 2592000, // 30 days
        full_page: false,
        delay: 3, // Wait 3 seconds for page to load
        timeout: 30, // 30 second timeout
      })

      return json({
        status: "success",
        message: "ScreenshotOne API is working correctly",
        testUrl,
        screenshotUrl,
        apiKeyConfigured: true
      })
      
    } catch (screenshotError) {
      return json({
        status: "error",
        message: "ScreenshotOne API error",
        error: screenshotError.message,
        testUrl,
        apiKeyConfigured: true
      })
    }
    
  } catch (err) {
    return json({
      status: "error",
      message: "Screenshot test failed",
      error: err.message
    })
  }
}