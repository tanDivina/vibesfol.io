import { error, type RequestHandler } from "@sveltejs/kit"

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

    // Since Playwright can't be installed in WebContainer, we'll provide a fallback
    // In a real deployment, this would use Playwright for screenshot generation
    
    // For now, return a placeholder image URL from a screenshot service
    const screenshotServiceUrl = `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=1200x800&format=png`
    
    // Alternative: Use a different screenshot service
    // const screenshotServiceUrl = `https://htmlcsstoimage.com/demo_images/image.png`
    
    return new Response(JSON.stringify({ 
      url: screenshotServiceUrl,
      message: "Screenshot generated using external service"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error("Error generating screenshot:", err)
    return error(500, "Failed to generate screenshot. Please try again.")
  }
}