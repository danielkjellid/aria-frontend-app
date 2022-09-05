const useSlug = (slug: string): string => {
  const route = useRoute()

  if (typeof route.params[slug] === 'string') {
    return route.params[slug] as string
  }
  return route.params[slug][0] as string
}

export default useSlug
