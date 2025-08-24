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

    // For now, always return a placeholder since ScreenshotOne API is having issues
    console.log("Screenshot requested for URL:", url)
    console.log("Using placeholder image due to API configuration issues")
    
    const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    
    return json({ 
      url: placeholderUrl,
      message: "Using placeholder image. Screenshot service will be available soon."
    })
    
  } catch (err) {
    console.error("Error in screenshot endpoint:", err)
    return error(500, "Screenshot service temporarily unavailable")
  }
}