const publicEndpoints = {
  auth: {
    obtainTokens: () => 'auth/tokens/obtain/',
    blacklistTokens: () => 'auth/tokens/blacklist/',
  },

  categories: {
    list: () => 'categories/',
    detail: (slug: string) => `categories/category/${slug}/`,
    parentList: () => 'categories/parents/',
    childrenList: (slug: string) => `categories/category/${slug}/children/`,
  },

  discounts: {
    active: () => 'discounts/active/',
  },

  front: {
    openingHours: () => 'front/opening-hours/',
    employeeList: () => 'front/employees/',
  },

  kitchens: {
    list: () => 'kitchens/',
    detail: (slug: string) => `kitchens/kitchen/${slug}/`,
  },

  products: {
    list: (categorySlug: string) => `products/category/${categorySlug}/`,
    detail: (slug: string) => `products/product/${slug}/`,
  },

  suppliers: {
    list: () => 'suppliers/',
  },

  users: {
    requestUser: () => 'users/me/',
  },
}

const internalEndpoints = {}

export { publicEndpoints as publicUrls, internalEndpoints as internalUrls }
