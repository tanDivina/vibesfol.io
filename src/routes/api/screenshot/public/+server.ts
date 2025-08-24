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
      // Create parameters object (without signature)
      const params = {
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
        full_page: "false",
        cache: "true",
        cache_ttl: "2592000"
      }

      // Create query string for signature generation
      const queryParams = new URLSearchParams()
      
      // Add parameters in alphabetical order (required by ScreenshotOne)
      const sortedKeys = Object.keys(params).sort()
      for (const key of sortedKeys) {
        queryParams.append(key, params[key as keyof typeof params])
      }
      
      const queryString = queryParams.toString()
      
      // Generate HMAC signature
      const crypto = await import("node:crypto")
      const signature = crypto
        .createHmac("sha256", env.SCREENSHOTONE_SECRET_KEY)
        .update(queryString)
        .digest("hex")
      
      // Create final URL with signature
      const screenshotUrl = new URL("https://api.screenshotone.com/take")
      screenshotUrl.search = `${queryString}&signature=${signature}`

      console.log("Generated ScreenshotOne URL:", screenshotUrl.toString())
      console.log("Query string for signature:", queryString)
      console.log("Generated signature:", signature)

      // Test the screenshot URL
      const testResponse = await fetch(screenshotUrl.toString(), { 
        method: "HEAD",
        headers: {
          'User-Agent': 'MyDevfol.io/1.0'
        }
      })
      
      if (!testResponse.ok) {
        console.error(`ScreenshotOne API error: ${testResponse.status} ${testResponse.statusText}`)
        
        // Get detailed error information
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
        message: "Screenshot service temporarily unavailable, using placeholder. Please verify your ScreenshotOne credentials are correct."
      })
    }
    
  } catch (err) {
    console.error("Error in screenshot endpoint:", err)
    return error(500, "Screenshot service temporarily unavailable")
  }
}