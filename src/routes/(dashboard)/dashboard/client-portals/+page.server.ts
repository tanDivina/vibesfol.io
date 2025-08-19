import { error, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { v4 as uuidv4 } from "uuid"

export const actions: Actions = {
  createClientPortal: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const portalData = {
      client_name: formData.get("client_name") as string,
      client_email: formData.get("client_email") as string,
      project_description: formData.get("project_description") as string,
      access_token: uuidv4(), // Generate a unique access token
      is_active: formData.get("is_active") === "on",
    }

    const { error: insertError } = await supabase
      .from("client_portals")
      .insert({
        ...portalData,
        user_id: session.user.id,
      })

    if (insertError) {
      throw error(500, "Failed to create client portal")
    }

    return { success: true }
  },

  updateClientPortal: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const portalId = formData.get("id") as string
    const portalData = {
      client_name: formData.get("client_name") as string,
      client_email: formData.get("client_email") as string,
      project_description: formData.get("project_description") as string,
      is_active: formData.get("is_active") === "on",
    }

    const { error: updateError } = await supabase
      .from("client_portals")
      .update(portalData)
      .eq("id", portalId)
      .eq("user_id", session.user.id)

    if (updateError) {
      throw error(500, "Failed to update client portal")
    }

    return { success: true }
  },

  deleteClientPortal: async ({
    request,
    locals: { supabase, safeGetSession },
  }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const portalId = formData.get("id") as string

    const { error: deleteError } = await supabase
      .from("client_portals")
      .delete()
      .eq("id", portalId)
      .eq("user_id", session.user.id)

    if (deleteError) {
      throw error(500, "Failed to delete client portal")
    }

    return { success: true }
  },
}
