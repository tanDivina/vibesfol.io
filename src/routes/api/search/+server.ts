import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = () => {
  // Simple search data for static sites
  const searchData = {
    index: [],
    indexData: [
      {
        title: "MyDevfol.io - Developer Portfolio Platform",
        description: "The ultimate portfolio platform for developers, indie hackers & vibecoders alike.",
        body: "Create stunning portfolios with automated screenshots, tech stack tagging, and professional themes. Perfect for developers, indie hackers, and creative professionals.",
        path: "/",
      },
      {
        title: "Pricing - MyDevfol.io",
        description: "Choose the perfect plan for your developer portfolio. Start free and upgrade as you grow.",
        body: "Simple, transparent pricing. Free plan with lifetime upgrade options. No recurring subscriptions.",
        path: "/pricing",
      },
      {
        title: "Blog - MyDevfol.io",
        description: "Tips, tutorials, and insights for developers.",
        body: "Learn how to build better portfolios and showcase your work effectively.",
        path: "/blog",
      },
      {
        title: "About Us - MyDevfol.io",
        description: "Learn about MyDevfol.io and our mission to help developers showcase their work.",
        body: "We're building the ultimate portfolio platform for developers who want to showcase their work beautifully and professionally.",
        path: "/about",
      },
      {
        title: "Support - MyDevfol.io",
        description: "Get help and support for MyDevfol.io.",
        body: "Find answers to common questions and contact our support team.",
        path: "/support",
      },
      {
        title: "How to Build a Killer Developer Portfolio",
        description: "The ultimate guide to creating a standout developer portfolio.",
        body: "Your developer portfolio is your digital resume, project showcase, and personal brand all in one.",
        path: "/blog/how-to-build-a-killer-developer-portfolio",
      },
      {
        title: "JavaScript Frameworks in 2025",
        description: "What's hot and what's not in the JavaScript ecosystem.",
        body: "The JavaScript ecosystem continues to evolve rapidly. Here's your guide to the most important frameworks.",
        path: "/blog/javascript-frameworks-2025",
      },
      {
        title: "Portfolio SEO Guide",
        description: "How to get your developer portfolio found on Google.",
        body: "Learn how to optimize your developer portfolio for search engines.",
        path: "/blog/portfolio-seo-guide",
      },
    ],
    buildTime: Date.now(),
  }

  return json(searchData)
}