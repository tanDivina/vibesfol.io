import { redirect, fail } from "@sveltejs/kit"
import { supabaseServiceRole } from "$lib/supabaseServiceRole"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession()

  if (!session || !user) {
    throw redirect(303, "/login")
  }

  // Fetch the user's current settings
  const { data: profile, error: profileError } = await supabaseServiceRole
    .from("profiles")
    .select(
      `
      seo_title,
      seo_description,
      seo_image_url,
      seo_keywords,
      custom_domain,
      custom_domain_verified,
      custom_domain_verification_token,
      analytics_enabled,
      contact_form_enabled,
      contact_form_title,
      contact_form_description,
      contact_email_notifications
    `,
    )
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching user settings:", profileError)
    return {
      session,
      user,
      settings: {},
    }
  }

  return {
    session,
    user,
    settings: profile,
  }
}

export const actions: Actions = {
  updateSeoSettings: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()

    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const seo_title = formData.get("seo_title") as string
    const seo_description = formData.get("seo_description") as string
    const seo_image_url = formData.get("seo_image_url") as string
    const seo_keywords = formData.get("seo_keywords") as string

    const { error } = await supabaseServiceRole
      .from("profiles")
      .update({
        seo_title,
        seo_description,
        seo_image_url,
        seo_keywords,
      })
      .eq("id", user.id)

    if (error) {
      console.error("Error updating SEO settings:", error)
      return fail(500, { message: "Failed to update SEO settings" })
    }

    return { success: true, message: "SEO settings updated successfully" }
  },

  updateContactFormSettings: async ({
    request,
    locals: { safeGetSession },
  }) => {
    const { session, user } = await safeGetSession()

    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const contact_form_enabled = formData.get("contact_form_enabled") === "on"
    const contact_form_title = formData.get("contact_form_title") as string
    const contact_form_description = formData.get(
      "contact_form_description",
    ) as string
    const contact_email_notifications =
      formData.get("contact_email_notifications") === "on"

    const { error } = await supabaseServiceRole
      .from("profiles")
      .update({
        contact_form_enabled,
        contact_form_title,
        contact_form_description,
        contact_email_notifications,
      })
      .eq("id", user.id)

    if (error) {
      console.error("Error updating contact form settings:", error)
      return fail(500, { message: "Failed to update contact form settings" })
    }

    return {
      success: true,
      message: "Contact form settings updated successfully",
    }
  },

  updateCustomDomain: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()

    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const custom_domain = formData.get("custom_domain") as string

    // Basic validation for domain format
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/
    if (custom_domain && !domainRegex.test(custom_domain)) {
      return fail(400, { message: "Invalid domain format" })
    }

    const { error } = await supabaseServiceRole
      .from("profiles")
      .update({
        custom_domain: custom_domain || null,
        custom_domain_verified: false, // Reset verification on change
      })
      .eq("id", user.id)

    if (error) {
      console.error("Error updating custom domain:", error)
      return fail(500, {
        message: "Failed to update custom domain. It might already be in use.",
      })
    }

    return {
      success: true,
      message:
        "Custom domain updated successfully. Please verify the new domain.",
    }
  },

  updateAnalyticsSettings: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()

    if (!session || !user) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const analytics_enabled = formData.get("analytics_enabled") === "on"

    const { error } = await supabaseServiceRole
      .from("profiles")
      .update({ analytics_enabled })
      .eq("id", user.id)

    if (error) {
      console.error("Error updating analytics settings:", error)
      return fail(500, { message: "Failed to update analytics settings" })
    }

    return { success: true, message: "Analytics settings updated successfully" }
  },
}
