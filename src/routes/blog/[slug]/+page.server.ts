import { error } from "@sveltejs/kit"
import fs from "fs"
import path from "path"
import grayMatter from "gray-matter"
import { marked } from "marked"

export const load = async ({ params }) => {
  const { slug } = params
  const postPath = path.join("src/routes/blog", `${slug}.md`)

  try {
    if (!fs.existsSync(postPath)) {
      throw error(404, "Post not found")
    }

    const post = fs.readFileSync(postPath, "utf-8")
    const { data, content } = grayMatter(post)

    return {
      post: {
        ...data,
        title: data.title,
        author: data.author,
        date: data.date,
        summary: data.summary,
        content: marked(content),
      },
    }
  } catch (err) {
    console.error("Error loading blog post:", err)
    throw error(404, "Post not found")
  }
}
