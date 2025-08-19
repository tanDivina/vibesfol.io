import { error, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
  createHackathon: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const hackathonData = {
      name: formData.get("name") as string,
      organizer: formData.get("organizer") as string,
      website: formData.get("website") as string,
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
    }

    const { error: insertError } = await supabase
      .from("hackathons")
      .insert(hackathonData)

    if (insertError) {
      throw error(500, "Failed to create hackathon")
    }

    return { success: true }
  },

  updateHackathon: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const hackathonId = formData.get("id") as string
    const hackathonData = {
      name: formData.get("name") as string,
      organizer: formData.get("organizer") as string,
      website: formData.get("website") as string,
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
    }

    const { error: updateError } = await supabase
      .from("hackathons")
      .update(hackathonData)
      .eq("id", hackathonId)

    if (updateError) {
      throw error(500, "Failed to update hackathon")
    }

    return { success: true }
  },

  deleteHackathon: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const hackathonId = formData.get("id") as string

    const { error: deleteError } = await supabase
      .from("hackathons")
      .delete()
      .eq("id", hackathonId)

    if (deleteError) {
      throw error(500, "Failed to delete hackathon")
    }

    return { success: true }
  },

  createCertificate: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const certificateData = {
      hackathon_id: formData.get("hackathon_id") as string,
      project_name: formData.get("project_name") as string,
      project_description: formData.get("project_description") as string,
      certificate_url: formData.get("certificate_url") as string,
      award: formData.get("award") as string,
    }

    const { error: insertError } = await supabase
      .from("hackathon_certificates")
      .insert({
        ...certificateData,
        user_id: session.user.id,
      })

    if (insertError) {
      throw error(500, "Failed to create certificate")
    }

    // After successful creation, trigger gamification checks
    const { gamificationService } = await import("$lib/gamification")
    await gamificationService.calculatePortfolioScore(session.user.id)
    await gamificationService.checkAchievements(session.user.id)

    return { success: true }
  },

  updateCertificate: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const session = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const certificateId = formData.get("id") as string
    const certificateData = {
      hackathon_id: formData.get("hackathon_id") as string,
      project_name: formData.get("project_name") as string,
      project_description: formData.get("project_description") as string,
      certificate_url: formData.get("certificate_url") as string,
      award: formData.get("award") as string,
    }

    const { error: updateError } = await supabase
      .from("hackathon_certificates")
      .update(certificateData)
      .eq("id", certificateId)
      .eq("user_id", session.user.id)

    if (updateError) {
      throw error(500, "Failed to update certificate")
    }

    // After successful update, trigger gamification checks
    const { gamificationService } = await import("$lib/gamification")
    await gamificationService.calculatePortfolioScore(session.user.id)
    await gamificationService.checkAchievements(session.user.id)

    return { success: true }
  },

  deleteCertificate: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const session = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const certificateId = formData.get("id") as string

    const { error: deleteError } = await supabase
      .from("hackathon_certificates")
      .delete()
      .eq("id", certificateId)
      .eq("user_id", session.user.id)

    if (deleteError) {
      throw error(500, "Failed to delete certificate")
    }

    // After successful deletion, trigger gamification checks
    const { gamificationService } = await import("$lib/gamification")
    await gamificationService.calculatePortfolioScore(session.user.id)
    await gamificationService.checkAchievements(session.user.id)

    return { success: true }
  },
}
