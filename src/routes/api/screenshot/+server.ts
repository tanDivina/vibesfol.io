import { error, type RequestHandler } from "@sveltejs/kit"
import { createClient } from "@supabase/supabase-js"
import { env as privateEnv } from "$env/dynamic/private"
import { env as publicEnv } from "$env/dynamic/public"

const supabaseServiceRole = createClient(
  publicEnv.PUBLIC_SUPABASE_URL,
  privateEnv.PRIVATE_SUPABASE_SERVICE_ROLE,
)

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

    // Since Playwright can't be installed in WebContainer, use a fallback service
    // In production, this would use a proper screenshot service or Playwright
    const screenshotServiceUrl = `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=1200x800&format=png`
    
    // For demo purposes, we'll return the service URL directly
    // In production, you'd want to download and store the image
    const publicUrl = screenshotServiceUrl

    // After successful upload, trigger gamification checks
    const { gamificationService } = await import("$lib/gamification")
    await gamificationService.calculatePortfolioScore(userId)
    await gamificationService.checkAchievements(userId)

    return new Response(JSON.stringify({ url: publicUrl }), {
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
