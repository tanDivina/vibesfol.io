import { error, type RequestHandler } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"

export const POST: RequestHandler = async ({
  request,
  locals: { safeGetSession },
}) => {
  try {
    const { session } = await safeGetSession()
    if (!session) {
      return error(401, "Unauthorized")
    }
    const userId = session.user.id

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
      return new Response(JSON.stringify({ 
        url: placeholderUrl,
        message: "Demo mode: Configure SCREENSHOTONE_ACCESS_KEY and SCREENSHOTONE_SECRET_KEY for real screenshots."
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    try {
      // Create the screenshot URL with proper parameters
      const screenshotUrl = new URL("https://api.screenshotone.com/take")
      
      // Add required parameters
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
      screenshotUrl.searchParams.set("full_page", "false")
      screenshotUrl.searchParams.set("cache", "true")
      screenshotUrl.searchParams.set("cache_ttl", "2592000") // 30 days

      // Generate signature for authentication
      const crypto = await import("node:crypto")
      const query = screenshotUrl.search
      const signature = crypto
        .createHmac("sha256", env.SCREENSHOTONE_SECRET_KEY)
        .update(query)
        .digest("hex")
      
      screenshotUrl.searchParams.set("signature", signature)

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

      return new Response(JSON.stringify({ 
        url: screenshotUrl.toString(),
        message: "Screenshot generated successfully using ScreenshotOne"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
      
    } catch (apiError) {
      console.error("ScreenshotOne API error:", apiError)
      
      // Fallback to placeholder
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return new Response(JSON.stringify({ 
        url: placeholderUrl,
        message: "Screenshot service temporarily unavailable, using placeholder. Please check your ScreenshotOne credentials."
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
    
  } catch (err) {
    console.error("Error generating screenshot:", err)

    return error(500, "Screenshot service temporarily unavailable")
  }
}
