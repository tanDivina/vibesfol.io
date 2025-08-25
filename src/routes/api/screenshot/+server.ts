import { error, json, type RequestHandler } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import * as screenshotone from "screenshotone-api-sdk"

export const POST: RequestHandler = async ({
  request,
  locals: { safeGetSession },
}) => {
  try {
    const { session } = await safeGetSession()
    if (!session) {
      return error(401, "Unauthorized")
    }

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

    try {
      // Create API client
      const client = new screenshotone.Client(env.SCREENSHOTONE_ACCESS_KEY)

      // Set up options
      const options = screenshotone.TakeOptions.url(url)
        .viewportWidth(1200)
        .viewportHeight(800)
        .deviceScaleFactor(1)
        .format("png")
        .imageQuality(80)
        .blockAds(true)
        .blockCookieBanners(true)
        .blockTrackers(true)
        .delay(3)
        .cache(true)
        .cacheTtl(2592000) // 30 days

      // Generate URL instead of downloading the image
      const screenshotUrl = client.generateTakeURL(options)
      
      console.log("Generated ScreenshotOne URL:", screenshotUrl)

      return json({ url: screenshotUrl })
      
    } catch (err) {
      console.error("ScreenshotOne SDK error:", err)
      
      // Fall back to placeholder
      const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      return json({ 
        url: placeholderUrl,
        message: "Screenshot service error, using placeholder"
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