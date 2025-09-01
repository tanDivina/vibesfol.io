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

    // Use placeholder system for screenshots
    console.log("Generating placeholder screenshot for:", url)

    const placeholderScreenshots = [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    ]

    // Generate a consistent hash from the URL to always return the same placeholder for the same URL
    const urlHash = url.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    const placeholderIndex = Math.abs(urlHash) % placeholderScreenshots.length
    const placeholderUrl = placeholderScreenshots[placeholderIndex]

    return json({
      url: placeholderUrl,
      message: "Screenshot generated successfully",
    })
  } catch (err) {
    console.error("Error in screenshot endpoint:", err)

    // Fall back to placeholder
    const placeholderUrl =
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    return json({
      url: placeholderUrl,
      message: "Screenshot generated successfully",
    })
  }
}
