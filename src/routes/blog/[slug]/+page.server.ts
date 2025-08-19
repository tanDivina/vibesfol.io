import { error } from "@sveltejs/kit"
import fs from "fs"
import path from "path"
import grayMatter from "gray-matter"
import { marked } from "marked"

export const load = async ({ params }) => {
  const { slug } = params
  const postPath = path.join("src/routes/blog", `${slug}.md`)

  if (!fs.existsSync(postPath)) {
    throw error(404, "Post not found")
  }

  const post = fs.readFileSync(postPath, "utf-8")
  const { data, content } = grayMatter(post)

  return {
    post: {
      ...data,
      content: marked(content),
    },
  }
}
