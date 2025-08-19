import { dev } from "$app/environment"
import fs from "fs"
import path from "path"
import grayMatter from "gray-matter"

export const load = async () => {
  const posts = fs
    .readdirSync("src/routes/blog")
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const postPath = path.join("src/routes/blog", file)
      const post = fs.readFileSync(postPath, "utf-8")
      const { data } = grayMatter(post)
      return {
        ...data,
        slug: file.slice(0, -3),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    posts,
  }
}
