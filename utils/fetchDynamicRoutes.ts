/**
 * Since we can't use imports for sitemaps we just fetch
 * all our routes from a custom API endpoint where we can use imports.
 */
export default async () => {
  const sitemapRoutes = await $fetch('/api/routes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return sitemapRoutes
}
