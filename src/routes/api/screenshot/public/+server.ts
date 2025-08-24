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

    if (!env.SCREENSHOTONE_ACCESS_KEY) {
      console.log("ScreenshotOne access key not configured, using placeholder")
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ url: placeholderUrl })
    }

    // Build ScreenshotOne URL with simple GET parameters
    const screenshotParams = new URLSearchParams({
      access_key: env.SCREENSHOTONE_ACCESS_KEY,
      url: url,
      viewport_width: "1200",
      viewport_height: "800",
      device_scale_factor: "1",
      format: "png",
      image_quality: "80",
      block_ads: "true",
      block_cookie_banners: "true",
      block_trackers: "true",
      delay: "3",
      cache: "true",
      cache_ttl: "2592000", // 30 days
    })

    const screenshotUrl = `https://api.screenshotone.com/take?${screenshotParams.toString()}`
    
    console.log("Generated ScreenshotOne URL:", screenshotUrl)

    // Test the URL by making a HEAD request to check if it's accessible
    const testResponse = await fetch(screenshotUrl, { method: "HEAD" })
    
    if (!testResponse.ok) {
      console.error("ScreenshotOne API error:", testResponse.status)
      const errorText = await testResponse.text()
      console.error("ScreenshotOne error details:", errorText)
      
      // Fall back to placeholder
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ 
        url: placeholderUrl,
        message: "Screenshot service temporarily unavailable, using placeholder"
      })
    }

    // Return the direct ScreenshotOne URL
    return json({ url: screenshotUrl })
    
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