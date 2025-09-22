import { error } from "@sveltejs/kit"
import fs from "fs"
import path from "path"
import grayMatter from "gray-matter"
import { marked } from "marked"

interface PostData {
  title: string;
  author: string;
  date: string;
  summary: string;
}

export const load = ({ params }) => {
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
        ...(data as PostData),
        content: marked(content),
      },
    }
  } catch (err) {
    console.error("Error loading blog post:", err)

    throw error(404, "Post not found")
  }
}
