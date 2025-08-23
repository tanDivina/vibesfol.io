import { dev } from "$app/environment"
import { error } from "@sveltejs/kit"
import { buildSearchIndex } from "$lib/build_index"

export async function GET() {
  try {
    // Build search index dynamically in dev mode, use pre-built in production
    const searchData = await buildSearchIndex()
    return new Response(JSON.stringify(searchData), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    console.error("Error building search index:", e)
    error(500, "Failed to build search index")
  }
}

export const prerender = true