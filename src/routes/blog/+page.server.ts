import { dev } from "$app/environment"
import fs from "fs"
import path from "path"
import grayMatter from "gray-matter"

interface Post {
  title: string
  date: string
  author: string
  summary: string
  slug: string
}

export const load = async () => {
  const posts: Post[] = fs
    .readdirSync("src/routes/blog")
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const postPath = path.join("src/routes/blog", file)
      const post = fs.readFileSync(postPath, "utf-8")
      const { data } = grayMatter(post)
      return {
        ...data,
        slug: file.slice(0, -3),
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    posts,
  }
}
