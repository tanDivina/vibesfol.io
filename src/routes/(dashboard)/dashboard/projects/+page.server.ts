import { error, redirect } from "@sveltejs/kit"
import { supabaseServiceRole } from "$lib/supabaseServiceRole"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()
  if (!session) {
    redirect(303, "/login")
  }

  // Fetch technologies for the combobox
  const { data: technologies, error: technologiesError } =
    await supabaseServiceRole
      .from("technologies")
      .select("id, name")
      .order("name")

  if (technologiesError) {
    console.error("Error fetching technologies:", technologiesError)
    throw error(500, "Failed to load technologies")
  }

  return {
    session,
    technologies: technologies || [],
  }
}

export const actions: Actions = {
  saveProject: async ({ request, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw error(401, "Unauthorized")
    }

    const formData = await request.formData()
    const projectData = JSON.parse(formData.get('projectData') as string)
    const technologies = JSON.parse(formData.get('technologies') as string)
    const isUpdate = formData.get('isUpdate') === 'true'
    const projectId = formData.get('projectId') as string

    try {
      let newProject = null

      if (isUpdate && projectId) {
        // Update project
        const { error: updateError } = await supabaseServiceRole
          .from('projects')
          .update(projectData)
          .eq('id', projectId)

        if (updateError) throw updateError
        newProject = { id: projectId, ...projectData }
      } else {
        // Create project
        const { data: createdProject, error: insertError } = await supabaseServiceRole
          .from('projects')
          .insert({ ...projectData, user_id: session.user.id })
          .select()
          .single()

        if (insertError) throw insertError
        newProject = createdProject
      }

      // Update project_technologies join table
      if (newProject) {
        // Delete existing technologies
        const { error: deleteError } = await supabaseServiceRole
          .from('project_technologies')
          .delete()
          .eq('project_id', newProject.id)

        if (deleteError) throw deleteError

        // Insert new technologies
        if (technologies.length > 0) {
          const projectTechnologies = technologies.map((tech: any) => ({
            project_id: newProject!.id,
            technology_id: tech.id,
          }))

          const { error: insertError } = await supabaseServiceRole
            .from('project_technologies')
            .insert(projectTechnologies)

          if (insertError) throw insertError
        }
      }

      // Trigger gamification checks
      const { gamificationService } = await import('$lib/gamification')
      await gamificationService.calculatePortfolioScore(session.user.id)
      await gamificationService.checkAchievements(session.user.id)

      return { success: true, project: newProject }
    } catch (err) {
      console.error('Error saving project:', err)
      throw error(500, 'Failed to save project')
    }
  },

  deleteProject: async ({ request, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (!session) {
      throw error(401, "Unauthorized")
    }

    const formData = await request.formData()
    const projectId = formData.get('projectId') as string

    try {
      const { error: deleteError } = await supabaseServiceRole
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', session.user.id) // Ensure user can only delete their own projects

      if (deleteError) throw deleteError

      return { success: true }
    } catch (err) {
      console.error('Error deleting project:', err)
      throw error(500, 'Failed to delete project')
    }
  }
}