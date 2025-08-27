import { redirect, fail } from "@sveltejs/kit"
import { supabaseServiceRole } from "$lib/supabaseServiceRole"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession()

  if (!session || !user) {
    throw redirect(303, "/login")
  }

  // Fetch user's testimonials
  const { data: testimonials, error: testimonialsError } = await supabaseServiceRole
    .from("testimonials")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (testimonialsError) {
    console.error("Error fetching testimonials:", testimonialsError)
    return {
      session,
      user,
      testimonials: [],
    }
  }

  return {
    session,
    user,
    testimonials: testimonials || [],
  }
}

export const actions: Actions = {
  createTestimonial: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()
    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const testimonialData = {
      client_name: formData.get("client_name") as string,
      client_title: formData.get("client_title") as string,
      client_company: formData.get("client_company") as string,
      testimonial_text: formData.get("testimonial_text") as string,
      is_published: formData.get("is_published") === "on",
    }

    // Validate required fields
    if (!testimonialData.client_name || !testimonialData.testimonial_text) {
      return fail(400, { 
        error: "Client name and testimonial text are required" 
      })
    }

    const { error: insertError } = await supabaseServiceRole
      .from("testimonials")
      .insert({
        ...testimonialData,
        user_id: user.id,
      })

    if (insertError) {
      console.error("Error creating testimonial:", insertError)
      return fail(500, { 
        error: "Failed to create testimonial" 
      })
    }

    // After successful creation, trigger gamification checks
    try {
      const { gamificationService } = await import("$lib/gamification")
      await gamificationService.calculatePortfolioScore(user.id)
      await gamificationService.checkAchievements(user.id)
    } catch (gamificationError) {
      console.error("Gamification update failed:", gamificationError)
      // Don't fail the request if gamification fails
    }

    return { success: true, message: "Testimonial created successfully!" }
  },

  updateTestimonial: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()
    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const testimonialId = formData.get("id") as string
    const testimonialData = {
      client_name: formData.get("client_name") as string,
      client_title: formData.get("client_title") as string,
      client_company: formData.get("client_company") as string,
      testimonial_text: formData.get("testimonial_text") as string,
      is_published: formData.get("is_published") === "on",
    }

    // Validate required fields
    if (!testimonialData.client_name || !testimonialData.testimonial_text) {
      return fail(400, { 
        error: "Client name and testimonial text are required" 
      })
    }

    const { error: updateError } = await supabaseServiceRole
      .from("testimonials")
      .update(testimonialData)
      .eq("id", testimonialId)
      .eq("user_id", user.id)

    if (updateError) {
      console.error("Error updating testimonial:", updateError)
      return fail(500, { 
        error: "Failed to update testimonial" 
      })
    }

    // After successful update, trigger gamification checks
    try {
      const { gamificationService } = await import("$lib/gamification")
      await gamificationService.calculatePortfolioScore(user.id)
      await gamificationService.checkAchievements(user.id)
    } catch (gamificationError) {
      console.error("Gamification update failed:", gamificationError)
      // Don't fail the request if gamification fails
    }

    return { success: true, message: "Testimonial updated successfully!" }
  },

  deleteTestimonial: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()
    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const testimonialId = formData.get("id") as string

    if (!testimonialId) {
      return fail(400, { 
        error: "Testimonial ID is required" 
      })
    }

    const { error: deleteError } = await supabaseServiceRole
      .from("testimonials")
      .delete()
      .eq("id", testimonialId)
      .eq("user_id", user.id)

    if (deleteError) {
      console.error("Error deleting testimonial:", deleteError)
      return fail(500, { 
        error: "Failed to delete testimonial" 
      })
    }

    // After successful deletion, trigger gamification checks
    try {
      const { gamificationService } = await import("$lib/gamification")
      await gamificationService.calculatePortfolioScore(user.id)
      await gamificationService.checkAchievements(user.id)
    } catch (gamificationError) {
      console.error("Gamification update failed:", gamificationError)
      // Don't fail the request if gamification fails
    }

    return { success: true, message: "Testimonial deleted successfully!" }
  },
}