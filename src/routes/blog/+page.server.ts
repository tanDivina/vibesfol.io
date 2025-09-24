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

export const load = () => {
  let posts: Post[] = []
  
  try {
    const blogDir = "src/routes/blog"
    
    // Check if blog directory exists and has markdown files
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"))
      
      posts = files
        .map((file) => {
          try {
            const postPath = path.join(blogDir, file)
            const post = fs.readFileSync(postPath, "utf-8")
            const { data } = grayMatter(post)
            return {
              ...data,
              slug: file.slice(0, -3),
            } as Post
          } catch (err) {
            console.error(`Error reading blog post ${file}:`, err)
            return null
          }
        })
        .filter((post): post is Post => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  } catch (err) {
    console.error("Error loading blog posts:", err)
    posts = []
  }

  return {
    posts,
  }
}
