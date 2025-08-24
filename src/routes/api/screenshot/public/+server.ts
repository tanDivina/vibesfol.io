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
    if (!env.SCREENSHOTONE_ACCESS_KEY) {
      console.warn("ScreenshotOne access key not configured, using placeholder")
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ 
        url: placeholderUrl,
        message: "Demo mode: Using placeholder image. Configure SCREENSHOTONE_ACCESS_KEY for real screenshots."
      })
    }

    try {
      // Simple ScreenshotOne API call without signature
      const screenshotUrl = new URL("https://api.screenshotone.com/take")
      screenshotUrl.searchParams.set("access_key", env.SCREENSHOTONE_ACCESS_KEY)
      screenshotUrl.searchParams.set("url", url)
      screenshotUrl.searchParams.set("viewport_width", "1200")
      screenshotUrl.searchParams.set("viewport_height", "800")
      screenshotUrl.searchParams.set("device_scale_factor", "1")
      screenshotUrl.searchParams.set("format", "png")
      screenshotUrl.searchParams.set("image_quality", "80")
      screenshotUrl.searchParams.set("block_ads", "true")
      screenshotUrl.searchParams.set("block_cookie_banners", "true")
      screenshotUrl.searchParams.set("block_trackers", "true")
      screenshotUrl.searchParams.set("delay", "3")
      screenshotUrl.searchParams.set("cache", "true")
      screenshotUrl.searchParams.set("cache_ttl", "2592000") // 30 days

      console.log("Generated ScreenshotOne URL:", screenshotUrl.toString())

      // Test the screenshot URL
      const testResponse = await fetch(screenshotUrl.toString(), { 
        method: "HEAD",
        headers: {
          'User-Agent': 'MyDevfol.io/1.0'
        }
      })
      
      if (!testResponse.ok) {
        console.error(`ScreenshotOne API error: ${testResponse.status} ${testResponse.statusText}`)
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
        message: "Screenshot service temporarily unavailable, using placeholder."
      })
    }
    
  } catch (err) {
    console.error("Error in screenshot endpoint:", err)
    return error(500, "Screenshot service temporarily unavailable")
  }
}