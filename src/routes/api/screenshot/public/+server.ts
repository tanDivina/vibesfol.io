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

    // Generate a placeholder screenshot based on the URL
    const placeholderScreenshots = [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
    ]
    
    // Use URL hash to consistently select the same placeholder for the same URL
    const urlHash = url.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const placeholderIndex = Math.abs(urlHash) % placeholderScreenshots.length
    const placeholderUrl = placeholderScreenshots[placeholderIndex]
    
    console.log(`Generated placeholder screenshot for ${url}: ${placeholderUrl}`)
    return json({ url: placeholderUrl })
    
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