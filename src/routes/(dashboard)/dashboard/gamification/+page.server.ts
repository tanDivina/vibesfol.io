import { gamificationService } from "$lib/gamification"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.session
  if (!session) {
    throw redirect(303, "/login")
  }

  try {
    const userId = session.user.id

    // Check for new achievements
    await gamificationService.checkAchievements(userId)

    // Get all gamification data
    const gamificationData =
      await gamificationService.getUserGamificationData(userId)

    // Get leaderboard data
    const leaderboard = await gamificationService.getLeaderboard()

    return {
      session,
      gamificationData,
      leaderboard,
    }
  } catch (error) {
    console.error("Error loading gamification page:", error)
    return {
      session,
      gamificationData: null,
      leaderboard: [],
      error: "Could not load gamification data.",
    }
  }
}
