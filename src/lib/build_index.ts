export function buildSearchIndex() {
  // Simplified for static sites - return basic search data
  const indexData = [
    {
      title: "MyDevfol.io - Developer Portfolio Platform",
      description: "The ultimate portfolio platform for developers, indie hackers & vibecoders alike.",
      body: "Create stunning portfolios with automated screenshots, tech stack tagging, and professional themes.",
      path: "/",
    },
    {
      title: "Pricing - MyDevfol.io",
      description: "Choose the perfect plan for your developer portfolio.",
      body: "Simple, transparent pricing. Free plan with lifetime upgrade options.",
      path: "/pricing",
    },
    {
      title: "Blog - MyDevfol.io",
      description: "Tips, tutorials, and insights for developers.",
      body: "Learn how to build better portfolios and showcase your work effectively.",
      path: "/blog",
    },
  ]

  return { index: [], indexData, buildTime: Date.now() }
}

export function buildAndCacheSearchIndex() {
  // Simplified for static deployment
  console.log("Search index simplified for static deployment")
}
