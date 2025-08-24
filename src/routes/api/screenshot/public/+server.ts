import { json, error, type RequestHandler } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"

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

    // Check if ScreenshotOne credentials are available
    if (!env.SCREENSHOTONE_ACCESS_KEY || !env.SCREENSHOTONE_SECRET_KEY) {
      console.warn("ScreenshotOne credentials not configured, using placeholder")
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ 
        url: placeholderUrl,
        message: "Demo mode: Using placeholder image. Configure SCREENSHOTONE_ACCESS_KEY and SCREENSHOTONE_SECRET_KEY for real screenshots."
      })
    }

    try {
      // Create the screenshot URL with proper parameters
      const screenshotUrl = new URL("https://api.screenshotone.com/take")
      
      // Add required parameters in the correct order for signature generation
      const params = new URLSearchParams()
      params.set("access_key", env.SCREENSHOTONE_ACCESS_KEY)
      params.set("url", url)
      params.set("viewport_width", "1200")
      params.set("viewport_height", "800")
      params.set("device_scale_factor", "1")
      params.set("format", "png")
      params.set("image_quality", "80")
      params.set("block_ads", "true")
      params.set("block_cookie_banners", "true")
      params.set("block_trackers", "true")
      params.set("delay", "3")
      params.set("full_page", "false")
      params.set("cache", "true")
      params.set("cache_ttl", "2592000") // 30 days

      // Generate signature for authentication
      const crypto = await import("node:crypto")
      const query = params.toString()
      const signature = crypto
        .createHmac("sha256", env.SCREENSHOTONE_SECRET_KEY)
        .update(query)
        .digest("hex")
      
      params.set("signature", signature)
      screenshotUrl.search = params.toString()

      // Test the screenshot URL by making a HEAD request first
      const testResponse = await fetch(screenshotUrl.toString(), { 
        method: "HEAD",
        headers: {
          'User-Agent': 'MyDevfol.io/1.0'
        }
      })
      
      if (!testResponse.ok) {
        console.error(`ScreenshotOne API error: ${testResponse.status} ${testResponse.statusText}`)
        
        // Try to get more details about the error
        const errorResponse = await fetch(screenshotUrl.toString(), {
          method: "GET",
          headers: {
            'User-Agent': 'MyDevfol.io/1.0'
          }
        })
        
        if (!errorResponse.ok) {
          const errorText = await errorResponse.text()
          console.error("ScreenshotOne error details:", errorText)
        }
        
        throw new Error(`ScreenshotOne API returned ${testResponse.status}`)
      }

      return json({ 
        url: screenshotUrl.toString(),
        message: "Screenshot generated successfully using ScreenshotOne"
      })
      
    } catch (apiError) {
      console.error("ScreenshotOne API error:", apiError)
      
      // Fallback to placeholder on any API error
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ 
        url: placeholderUrl,
        message: "Screenshot service temporarily unavailable, using placeholder. Please check your ScreenshotOne credentials."
      })
    }
    
  } catch (err) {
    console.error("Error in screenshot endpoint:", err)
    return error(500, "Screenshot service temporarily unavailable")
  }
}