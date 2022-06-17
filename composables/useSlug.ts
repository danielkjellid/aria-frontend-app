const useSlug = (slug: string) => {
  const route = useRoute()

  if (typeof route.params[slug] === 'string') {
    return route.params[slug]
  }
  return route.params[slug][0]
}

export default useSlug
