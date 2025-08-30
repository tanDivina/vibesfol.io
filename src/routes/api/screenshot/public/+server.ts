import { json, error, type RequestHandler } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import { Client } from "screenshotone-api-sdk"

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { url } = await request.json()

    if (!url) {
      return error(400, "URL is required")
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return error(400, "Invalid URL format")
    }

    // Check if ScreenshotOne API key is configured
    if (!env.PRIVATE_SCREENSHOTONE_API_KEY) {
      console.log("ScreenshotOne API key not configured, using placeholder")
      
      // Fallback to placeholder system
      const placeholderScreenshots = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
      ]
      
      const urlHash = url.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0)
      const placeholderIndex = Math.abs(urlHash) % placeholderScreenshots.length
      const placeholderUrl = placeholderScreenshots[placeholderIndex]
      
      return json({ 
        url: placeholderUrl,
        message: "Using placeholder - ScreenshotOne API key not configured"
      })
    }

    try {
      // Initialize ScreenshotOne client
      const client = new Client(env.PRIVATE_SCREENSHOTONE_API_KEY)

      // Generate screenshot URL with optimized settings
      const screenshotUrl = client.generateTakeScreenshotURL({
        url: url,
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

      console.log(`Generated ScreenshotOne URL for ${url}: ${screenshotUrl}`)
      return json({ url: screenshotUrl })
      
    } catch (screenshotError) {
      console.error("ScreenshotOne API error:", screenshotError)
      
      // Fallback to placeholder on API error
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ 
        url: placeholderUrl,
        message: "ScreenshotOne API error, using placeholder"
      })
    }
    
  } catch (err) {
    console.error("Error in screenshot endpoint:", err)
    
    // Fall back to placeholder
    const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    return json({ 
      url: placeholderUrl,
      message: "Screenshot service error, using placeholder"
    })
  }
}