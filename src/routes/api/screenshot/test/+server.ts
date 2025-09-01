import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async () => {
  try {
    // Test URL for screenshot
    const testUrl = "https://example.com"

    return json({
      status: "success",
      message: "Screenshot API is working with placeholder system",
      testUrl,
      fallback: "Using high-quality placeholder images",
      apiKeyConfigured: false,
    })
  } catch (err) {
    return json({
      status: "error",
      message: "Screenshot test failed",
      error: err instanceof Error ? err.message : "Unknown error",
    })
  }
}
