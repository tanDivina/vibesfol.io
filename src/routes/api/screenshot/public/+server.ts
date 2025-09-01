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
    // Use screenshot.guru - a reliable free service
    const screenshotServiceUrl = `https://shot.screenshotapi.net/screenshot`
    
    const params = new URLSearchParams({
      url: url,
      width: "1200",
      height: "800",
      output: "image",
      file_type: "png",
      wait_for_event: "load",
      ttl: "2592000" // 30 days cache
    })

    const finalUrl = `${screenshotServiceUrl}?${params.toString()}`
    
    // Test if the service responds
    try {
      const testResponse = await fetch(finalUrl, { 
        method: 'HEAD',
        timeout: 10000 
      })
      
      if (testResponse.ok) {
        return finalUrl
      }
    } catch (testError) {
      console.log("Primary service failed, trying fallback")
    }

    // Fallback to screenshotmachine
    const fallbackUrl = `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=1200x800&format=png&cacheLimit=0`
    
    try {
      const fallbackResponse = await fetch(fallbackUrl, { 
        method: 'HEAD',
        timeout: 10000 
      })
      
      if (fallbackResponse.ok) {
        return fallbackUrl
      }
    } catch (fallbackError) {
      console.log("Fallback service failed, using final fallback")
    }

    // Final fallback - thum.io (reliable service)
    return `https://image.thum.io/get/width/1200/crop/800/${encodeURIComponent(url)}`
    
  } catch (err) {
    console.error("All screenshot services failed:", err)
    
    // Return a working screenshot service as last resort
    return `https://image.thum.io/get/width/1200/crop/800/${encodeURIComponent(url)}`
  }
}