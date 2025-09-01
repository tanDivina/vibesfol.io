import { json, error, type RequestHandler } from "@sveltejs/kit"

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

    // Use the same screenshot generation function as the authenticated endpoint
    const screenshotUrl = await generateScreenshot(url)

    return json({
      url: screenshotUrl,
      message: "Screenshot generated successfully",
    })
  } catch (err) {
    console.error("Error in public screenshot endpoint:", err)
    return error(500, "Failed to generate screenshot")
  }
}

async function generateScreenshot(url: string): Promise<string> {
  try {
    // Use ScreenshotOne API - a reliable screenshot service
    const apiKey = process.env.SCREENSHOTONE_API_KEY || "demo"
    const screenshotApiUrl = `https://api.screenshotone.com/take`
    
    const params = new URLSearchParams({
      access_key: apiKey,
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
      timeout: "30",
    })

    const screenshotUrl = `${screenshotApiUrl}?${params.toString()}`
    
    // Test if the screenshot service is accessible
    const response = await fetch(screenshotUrl, { method: 'HEAD' })
    
    if (response.ok) {
      return screenshotUrl
    } else {
      throw new Error("Screenshot service unavailable")
    }
  } catch (err) {
    console.error("Screenshot generation failed:", err)
    
    // Fallback to URLBox.io API
    try {
      const urlboxUrl = `https://api.urlbox.io/v1/demo/png?url=${encodeURIComponent(url)}&width=1200&height=800&delay=3000`
      
      // Test the fallback service
      const fallbackResponse = await fetch(urlboxUrl, { method: 'HEAD' })
      if (fallbackResponse.ok) {
        return urlboxUrl
      }
      throw new Error("Fallback service also unavailable")
    } catch (fallbackErr) {
      // Use screenshot.guru as final fallback
      const screenshotGuruUrl = `https://screenshot.guru/api/screenshot?url=${encodeURIComponent(url)}&width=1200&height=800&format=png`
      return screenshotGuruUrl
    }
  }
}