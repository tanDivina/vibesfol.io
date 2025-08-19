import { supabaseServiceRole } from "./supabaseServiceRole"
import type { Database } from "./DatabaseDefinitions"

type Achievement = Database["public"]["Tables"]["achievements"]["Row"]
type UserAchievement = Database["public"]["Tables"]["user_achievements"]["Row"]
type PortfolioScore = Database["public"]["Tables"]["portfolio_scores"]["Row"]
type UserStreak = Database["public"]["Tables"]["user_streaks"]["Row"]

export interface GamificationData {
  achievements: Achievement[]
  userAchievements: UserAchievement[]
  portfolioScore: PortfolioScore | null
  streaks: UserStreak[]
  totalPoints: number
  completionPercentage: number
  rank: number | null
}

export class GamificationService {
  private supabase = supabaseServiceRole

  // Calculate portfolio completion percentage
  async calculatePortfolioCompletion(userId: string): Promise<number> {
    try {
      const { data: profile } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (!profile) return 0

      let completionScore = 0
      const maxScore = 100

      // Basic profile info (30 points)
      if (profile.full_name) completionScore += 10
      if (profile.bio) completionScore += 10
      if (profile.location) completionScore += 5
      if (profile.website) completionScore += 5

      // Social links (20 points)
      if (profile.github_url) completionScore += 5
      if (profile.linkedin_url) completionScore += 5
      if (profile.twitter_url) completionScore += 5
      if (profile.instagram_url) completionScore += 5

      // Projects (30 points)
      const { count: projectCount } = await this.supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)

      if (projectCount && projectCount > 0) completionScore += 15
      if (projectCount && projectCount >= 3) completionScore += 15

      // Testimonials (10 points)
      const { count: testimonialCount } = await this.supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)

      if (testimonialCount && testimonialCount > 0) completionScore += 5
      if (testimonialCount && testimonialCount >= 3) completionScore += 5

      // Hackathon certificates (10 points)
      const { count: hackathonCount } = await this.supabase
        .from("hackathon_certificates")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)

      if (hackathonCount && hackathonCount > 0) completionScore += 10

      return Math.min(completionScore, maxScore)
    } catch (error) {
      console.error("Error calculating portfolio completion:", error)
      return 0
    }
  }

  // Calculate portfolio score
  async calculatePortfolioScore(userId: string): Promise<PortfolioScore> {
    try {
      const completionPercentage =
        await this.calculatePortfolioCompletion(userId)

      // Get project count and technologies
      const { data: projects } = await this.supabase
        .from("projects")
        .select("*, project_technologies(technology_id)")
        .eq("user_id", userId)

      const projectCount = projects?.length || 0
      const uniqueTechCount = new Set(
        projects?.flatMap(
          (p) => p.project_technologies?.map((pt) => pt.technology_id) || [],
        ),
      ).size

      // Get testimonial count
      const { count: testimonialCount } = await this.supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)

      // Get achievement points
      const { data: userAchievements } = await this.supabase
        .from("user_achievements")
        .select("achievements(points)")
        .eq("user_id", userId)

      const achievementPoints =
        userAchievements?.reduce((total, ua) => {
          return total + (ua.achievements?.points || 0)
        }, 0) || 0

      // Calculate scores
      const projectsScore = Math.min(projectCount * 10, 100)
      const profileScore = completionPercentage
      const socialScore = Math.min((testimonialCount || 0) * 5, 50)
      const engagementScore = Math.min(uniqueTechCount * 5, 50)
      const totalScore =
        projectsScore +
        profileScore +
        socialScore +
        engagementScore +
        achievementPoints

      const scoreData = {
        user_id: userId,
        total_score: totalScore,
        completion_percentage: completionPercentage,
        projects_score: projectsScore,
        profile_score: profileScore,
        social_score: socialScore,
        engagement_score: engagementScore,
        achievement_points: achievementPoints,
        last_calculated: new Date().toISOString(),
      }

      // Upsert the score
      const { data, error } = await this.supabase
        .from("portfolio_scores")
        .upsert(scoreData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error calculating portfolio score:", error)
      throw error
    }
  }

  // Check and award achievements
  async checkAchievements(userId: string): Promise<UserAchievement[]> {
    try {
      const newAchievements: UserAchievement[] = []

      // Get all achievements
      const { data: achievements } = await this.supabase
        .from("achievements")
        .select("*")
        .eq("is_active", true)

      if (!achievements) return []

      // Get user's current achievements
      const { data: userAchievements } = await this.supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", userId)

      const earnedAchievementIds = new Set(
        userAchievements?.map((ua) => ua.achievement_id) || [],
      )

      // Check each achievement
      for (const achievement of achievements) {
        if (earnedAchievementIds.has(achievement.id)) continue

        const earned = await this.checkSingleAchievement(userId, achievement)
        if (earned) {
          const { data: newAchievement } = await this.supabase
            .from("user_achievements")
            .insert({
              user_id: userId,
              achievement_id: achievement.id,
              earned_at: new Date().toISOString(),
            })
            .select()
            .single()

          if (newAchievement) {
            newAchievements.push(newAchievement)
          }
        }
      }

      return newAchievements
    } catch (error) {
      console.error("Error checking achievements:", error)
      return []
    }
  }

  // Check a single achievement
  private async checkSingleAchievement(
    userId: string,
    achievement: Achievement,
  ): Promise<boolean> {
    try {
      switch (achievement.requirement_type) {
        case "count":
          return await this.checkCountAchievement(userId, achievement)
        case "boolean":
          return await this.checkBooleanAchievement(userId, achievement)
        case "streak":
          return await this.checkStreakAchievement(userId, achievement)
        default:
          return false
      }
    } catch (error) {
      console.error(`Error checking achievement ${achievement.name}:`, error)
      return false
    }
  }

  private async checkCountAchievement(
    userId: string,
    achievement: Achievement,
  ): Promise<boolean> {
    const requiredCount = achievement.requirement_value || 0
    let actualCount = 0

    switch (achievement.name) {
      case "First Steps":
      case "Getting Started":
      case "Project Pro":
      case "Portfolio Powerhouse":
        const { count: projectCount } = await this.supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
        actualCount = projectCount || 0
        break

      case "Tech Explorer":
      case "Full Stack":
        const { data: projects } = await this.supabase
          .from("projects")
          .select("project_technologies(technology_id)")
          .eq("user_id", userId)
        const uniqueTechs = new Set(
          projects?.flatMap(
            (p) => p.project_technologies?.map((pt) => pt.technology_id) || [],
          ),
        )
        actualCount = uniqueTechs.size
        break

      case "First Impression":
      case "Social Proof":
      case "Testimonial Champion":
        const { count: testimonialCount } = await this.supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
        actualCount = testimonialCount || 0
        break

      case "Hackathon Hero":
      case "Competition King":
        const { count: hackathonCount } = await this.supabase
          .from("hackathon_certificates")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
        actualCount = hackathonCount || 0
        break

      case "Screenshot Master":
        const { count: screenshotCount } = await this.supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .not("screenshot_url", "is", null)
        actualCount = screenshotCount || 0
        break

      case "Client Connector":
        const { count: portalCount } = await this.supabase
          .from("client_portals")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
        actualCount = portalCount || 0
        break
    }

    return actualCount >= requiredCount
  }

  private async checkBooleanAchievement(
    userId: string,
    achievement: Achievement,
  ): Promise<boolean> {
    switch (achievement.name) {
      case "Welcome Aboard":
        const { data: profile } = await this.supabase
          .from("profiles")
          .select("full_name, bio")
          .eq("id", userId)
          .single()
        return !!(profile?.full_name && profile?.bio)

      case "Profile Master":
        const completion = await this.calculatePortfolioCompletion(userId)
        return completion >= 80

      case "Portfolio Complete":
        const fullCompletion = await this.calculatePortfolioCompletion(userId)
        return fullCompletion >= 100

      case "Trendsetter":
        // This would need to be manually awarded or based on user creation date
        return false

      default:
        return false
    }
  }

  private async checkStreakAchievement(
    userId: string,
    achievement: Achievement,
  ): Promise<boolean> {
    const requiredStreak = achievement.requirement_value || 0

    const { data: streak } = await this.supabase
      .from("user_streaks")
      .select("current_streak")
      .eq("user_id", userId)
      .eq("streak_type", "login")
      .single()

    return (streak?.current_streak || 0) >= requiredStreak
  }

  // Get user's gamification data
  async getUserGamificationData(userId: string): Promise<GamificationData> {
    try {
      // Get all achievements
      const { data: achievements } = await this.supabase
        .from("achievements")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("points", { ascending: true })

      // Get user's achievements
      const { data: userAchievements } = await this.supabase
        .from("user_achievements")
        .select("*, achievements(*)")
        .eq("user_id", userId)
        .order("earned_at", { ascending: false })

      // Get or calculate portfolio score
      const portfolioScore = await this.calculatePortfolioScore(userId)

      // Get user streaks
      const { data: streaks } = await this.supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", userId)

      // Calculate total points
      const totalPoints =
        userAchievements?.reduce((total, ua) => {
          return total + (ua.achievements?.points || 0)
        }, 0) || 0

      // Get user's rank
      const { data: rankData } = await this.supabase
        .from("portfolio_scores")
        .select("user_id, total_score")
        .order("total_score", { ascending: false })

      const rank = rankData?.findIndex((r) => r.user_id === userId) + 1 || null

      return {
        achievements: achievements || [],
        userAchievements: userAchievements || [],
        portfolioScore,
        streaks: streaks || [],
        totalPoints,
        completionPercentage: portfolioScore?.completion_percentage || 0,
        rank,
      }
    } catch (error) {
      console.error("Error getting gamification data:", error)
      throw error
    }
  }

  // Update user streak
  async updateStreak(userId: string, streakType: string): Promise<void> {
    try {
      const today = new Date().toISOString().split("T")[0]

      const { data: existingStreak } = await this.supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", userId)
        .eq("streak_type", streakType)
        .single()

      if (existingStreak) {
        const lastActivity = existingStreak.last_activity_date
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split("T")[0]

        let newStreak = 1
        if (lastActivity === yesterdayStr) {
          newStreak = existingStreak.current_streak + 1
        } else if (lastActivity === today) {
          // Already updated today
          return
        }

        const longestStreak = Math.max(existingStreak.longest_streak, newStreak)

        await this.supabase
          .from("user_streaks")
          .update({
            current_streak: newStreak,
            longest_streak: longestStreak,
            last_activity_date: today,
          })
          .eq("id", existingStreak.id)
      } else {
        await this.supabase.from("user_streaks").insert({
          user_id: userId,
          streak_type: streakType,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
        })
      }
    } catch (error) {
      console.error("Error updating streak:", error)
    }
  }

  // Get leaderboard
  async getLeaderboard(category: string = "overall", limit: number = 10) {
    try {
      const { data } = await this.supabase
        .from("portfolio_scores")
        .select(
          `
          *,
          profiles(full_name, username, avatar_url)
        `,
        )
        .order("total_score", { ascending: false })
        .limit(limit)

      return data || []
    } catch (error) {
      console.error("Error getting leaderboard:", error)
      return []
    }
  }
}

export const gamificationService = new GamificationService()
