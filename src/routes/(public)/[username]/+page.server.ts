import { redirect } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"
import { supabaseServiceRole } from "$lib/supabaseServiceRole"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({
  params,
  locals: { safeGetSession },
  url,
}) => {
  const { session } = await safeGetSession()
  const { username } = params

  // Handle empty or invalid usernames
  if (!username || username.trim() === "") {
    throw redirect(302, "/")
  }

  // Prevent common route conflicts
  const reservedRoutes = [
    "api", "auth", "dashboard", "admin", "blog", "about", "contact", 
    "pricing", "login", "signup", "terms", "privacy", "vs", "search",
    "build", "demo-profile", "preview", "client-portal"
  ]
  if (reservedRoutes.includes(username.toLowerCase())) {
    throw redirect(302, "/")
  }

  // Demo data for showcasing the public portfolio functionality
  if (username === "demo") {
    return {
      session,
      user: {
        id: "demo-user",
        full_name: "John Doe",
        username: "demo",
        avatar_url:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        website: "https://johndoe.dev",
        bio: "Full-stack developer passionate about creating beautiful, functional web applications. I love working with modern technologies and building solutions that make a difference.",
        github_url: "https://github.com/johndoe",
        linkedin_url: "https://linkedin.com/in/johndoe",
        twitter_url: "https://twitter.com/johndoe",
        medium_url: "https://medium.com/@johndoe",
        gumroad_url: "https://gumroad.com/johndoe",
        substack_url: "https://johndoe.substack.com",
        amazon_gear_list_url: "https://amazon.com/shop/johndoe",
        whatsapp_number: "+1234567890",
        youtube_url: "https://youtube.com/@johndoe",
        portfolio_theme: "modern",
        contact_form_enabled: true,
        contact_form_title: "Get In Touch",
        contact_form_description:
          "I'd love to hear from you! Send me a message and I'll get back to you as soon as possible.",
        contact_email_notifications: true,
      },
      projects: [
        {
          id: "project-1",
          title: "E-commerce Platform",
          description:
            "A full-stack e-commerce platform built with modern technologies. Features include user authentication, payment processing, and admin dashboard.",
          url: "https://mystore.example.com",
          screenshot_url:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          status: "LIVE",
          technologies: [
            { technologies: { id: "1", name: "React" } },
            { technologies: { id: "2", name: "Node.js" } },
            { technologies: { id: "3", name: "PostgreSQL" } },
            { technologies: { id: "4", name: "Stripe" } },
          ],
        },
        {
          id: "project-2",
          title: "Task Management App",
          description:
            "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
          url: "https://taskapp.example.com",
          screenshot_url:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
          status: "LIVE",
          technologies: [
            { technologies: { id: "5", name: "Vue.js" } },
            { technologies: { id: "6", name: "Express.js" } },
            { technologies: { id: "7", name: "MongoDB" } },
            { technologies: { id: "8", name: "Socket.io" } },
          ],
        },
        {
          id: "project-3",
          title: "Weather Dashboard",
          description:
            "A beautiful weather dashboard showing current conditions, forecasts, and weather maps with a clean, responsive design.",
          url: "https://weather.example.com",
          screenshot_url:
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
          status: "IN PROGRESS",
          technologies: [
            { technologies: { id: "9", name: "Next.js" } },
            { technologies: { id: "10", name: "TypeScript" } },
            { technologies: { id: "11", name: "Tailwind CSS" } },
          ],
        },
      ],
    }
  }

  // Fetch user data with all necessary fields including contact form settings
  const { data: user, error: userError } = await supabaseServiceRole
    .from("profiles")
    .select(
      `
      id,
      full_name,
      company_name,
      avatar_url,
      website,
      unsubscribed,
      planId,
      username,
      bio,
      portfolio_theme,
      contact_form_enabled,
      contact_form_title,
      contact_form_description,
      contact_email_notifications,
      seo_title,
      seo_description,
      seo_image_url,
      seo_keywords
    `,
    )
    .eq("username", username)
    .single()

  if (userError || !user) {
    console.error("Error fetching user:", userError)
    throw error(404, "User not found")
  }

  // Fetch user's projects
  const { data: projects, error: projectsError } = await supabaseServiceRole
    .from("projects")
    .select("*, technologies:project_technologies(technologies(id, name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (projectsError) {
    console.error("Error fetching projects:", projectsError)
    throw error(500, "Failed to load projects")
  }

  return {
    session,
    user,
    projects: projects || [],
  }
}
