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
    const placeholderUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    
    // For demo purposes, return a placeholder image
    const publicUrl = placeholderUrl

    // After successful upload, trigger gamification checks
    const { gamificationService } = await import("$lib/gamification")
    await gamificationService.calculatePortfolioScore(userId)
    await gamificationService.checkAchievements(userId)

    return new Response(JSON.stringify({ 
      url: publicUrl,
      message: "Demo mode: Using placeholder image. In production, this would capture actual screenshots."
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error("Error generating screenshot:", err)

    return error(500, "Screenshot service temporarily unavailable")
  }
}
