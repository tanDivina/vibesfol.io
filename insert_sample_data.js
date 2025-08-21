import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://zmhkrvrdmjndktbdedbk.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaGtydnJkbWpuZGt0YmRlZGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMjcyOTQsImV4cCI6MjA1MTcwMzI5NH0.Zt8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8"

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertSampleData() {
  try {
    // Insert sample user
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .insert({
        id: "demo-user-123",
        username: "johndoe",
        full_name: "John Doe",
        website: "https://johndoe.dev",
        plan_id: "free",
      })
      .select()
      .single()

    if (userError) {
      console.error("Error inserting user:", userError)
      return
    }

    console.log("User inserted:", user)

    // Insert sample projects
    const projects = [
      {
        id: "project-1",
        user_id: "demo-user-123",
        title: "E-commerce Platform",
        description:
          "A full-stack e-commerce platform built with modern technologies. Features include user authentication, payment processing, and admin dashboard.",
        url: "https://mystore.example.com",
        screenshot_url:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        status: "LIVE",
      },
      {
        id: "project-2",
        user_id: "demo-user-123",
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
        url: "https://taskapp.example.com",
        screenshot_url:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        status: "LIVE",
      },
      {
        id: "project-3",
        user_id: "demo-user-123",
        title: "Weather Dashboard",
        description:
          "A beautiful weather dashboard showing current conditions, forecasts, and weather maps with a clean, responsive design.",
        url: "https://weather.example.com",
        screenshot_url:
          "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
        status: "IN PROGRESS",
      },
    ]

    const { data: insertedProjects, error: projectsError } = await supabase
      .from("projects")
      .insert(projects)
      .select()

    if (projectsError) {
      console.error("Error inserting projects:", projectsError)
      return
    }

    console.log("Projects inserted:", insertedProjects)

    // Get some technologies to link
    const { data: technologies, error: techError } = await supabase
      .from("technologies")
      .select("*")
      .limit(10)

    if (techError) {
      console.error("Error fetching technologies:", techError)
      return
    }

    console.log("Available technologies:", technologies)

    // Insert project-technology relationships
    const projectTechnologies = [
      // E-commerce Platform
      {
        project_id: "project-1",
        technology_id: technologies.find((t) => t.name === "React")?.id,
      },
      {
        project_id: "project-1",
        technology_id: technologies.find((t) => t.name === "Node.js")?.id,
      },
      {
        project_id: "project-1",
        technology_id: technologies.find((t) => t.name === "PostgreSQL")?.id,
      },

      // Task Management App
      {
        project_id: "project-2",
        technology_id: technologies.find((t) => t.name === "Vue.js")?.id,
      },
      {
        project_id: "project-2",
        technology_id: technologies.find((t) => t.name === "Express.js")?.id,
      },
      {
        project_id: "project-2",
        technology_id: technologies.find((t) => t.name === "MongoDB")?.id,
      },

      // Weather Dashboard
      {
        project_id: "project-3",
        technology_id: technologies.find((t) => t.name === "Next.js")?.id,
      },
      {
        project_id: "project-3",
        technology_id: technologies.find((t) => t.name === "TypeScript")?.id,
      },
      {
        project_id: "project-3",
        technology_id: technologies.find((t) => t.name === "Tailwind CSS")?.id,
      },
    ].filter((pt) => pt.technology_id) // Remove any undefined technology_ids

    if (projectTechnologies.length > 0) {
      const { error: ptError } = await supabase
        .from("project_technologies")
        .insert(projectTechnologies)

      if (ptError) {
        console.error("Error inserting project technologies:", ptError)
        return
      }

      console.log("Project technologies inserted successfully")
    }

    console.log("Sample data inserted successfully!")
  } catch (error) {
    console.error("Error:", error)
  }
}

insertSampleData()
