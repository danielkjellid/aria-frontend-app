const publicEndpoints = {
  auth: {
    obtainTokens: () => '/auth/tokens/obtain/',
    blacklistTokens: () => '/auth/tokens/blacklist/',
  },

  categories: {
    list: () => '/categories/',
    detail: (slug: string) => `/categories/${slug}/`,
    parentList: () => '/categories/parents/',
    childrenList: (slug: string) => `/categories/${slug}/children/`,
  },

  discounts: {
    list: () => '/discounts/',
  },

  employees: {
    list: () => '/employees/',
  },

  front: {
    openingHours: () => '/front/opening-hours/',
  },

  kitchens: {
    list: () => '/kitchens/',
    detail: (slug: string) => `/kitchens/${slug}/`,
  },

  products: {
    listByCategory: (categorySlug: string) => `/products/category/${categorySlug}/`,
    list: () => '/products/',
    detail: (slug: string) => `/products/${slug}/`,
  },

  suppliers: {
    list: () => '/suppliers/',
  },

  users: {
    requestUser: () => '/users/me/',
    create: () => '/users/create/',
    verifyConfirm: () => '/users/verify/confirm/',
    passwordReset: () => '/users/password/reset/',
    passwordResetConfirm: () => '/users/password/reset/confirm/',
  },
}

const internalEndpoints = {}

export { publicEndpoints as publicUrls, internalEndpoints as internalUrls }
