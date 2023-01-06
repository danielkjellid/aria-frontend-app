const publicEndpoints = {
  auth: {
    obtainTokens: () => '/v1/auth/tokens/obtain/',
    blacklistTokens: () => '/v1/auth/tokens/blacklist/',
  },

  categories: {
    list: () => '/v1/categories/',
    detail: (slug: string) => `/v1/categories/${slug}/`,
    parentList: () => '/v1/categories/parents/',
    childrenList: (slug: string) => `/v1/categories/${slug}/children/`,
  },

  discounts: {
    list: () => '/v1/discounts/',
  },

  employees: {
    list: () => '/v1/employees/',
  },

  front: {
    openingHours: () => '/v1/front/opening-hours/',
  },

  kitchens: {
    list: () => '/v1/kitchens/',
    detail: (slug: string) => `/v1/kitchens/${slug}/`,
  },

  products: {
    listByCategory: (categorySlug: string) => `/v1/products/category/${categorySlug}/`,
    list: () => '/v1/products/',
    detail: (slug: string) => `/v1/products/${slug}/`,
  },

  suppliers: {
    list: () => '/v1/suppliers/',
  },

  users: {
    requestUser: () => '/v1/users/me/',
    create: () => '/v1/users/create/',
    verifyConfirm: () => '/v1/users/verify/confirm/',
    passwordReset: () => '/v1/users/password/reset/',
    passwordResetConfirm: () => '/v1/users/password/reset/confirm/',
  },
}

const internalEndpoints = {
  categories: {
    list: () => '/v1/internal/categories/',
  },

  products: {
    list: () => '/v1/internal/products/',
    create: () => '/v1/internal/products/create/',
    createOptionsInBulk: (productId: number) =>
      `/v1/internal/products/${productId}/options/bulk-create/`,
  },

  productAttributes: {
    colors: {
      list: () => '/v1/internal/product-attributes/colors/',
    },
    materials: {
      list: () => '/v1/internal/product-attributes/materials/',
    },
    rooms: {
      list: () => '/v1/internal/product-attributes/rooms/',
    },
    shapes: {
      list: () => '/v1/internal/product-attributes/shapes/',
    },
    variants: {
      list: () => '/v1/internal/product-attributes/variants/',
      create: () => '/v1/internal/product-attributes/variants/create/',
    },
  },

  suppliers: {
    list: () => '/v1/internal/suppliers/',
  },
}

export { publicEndpoints as publicUrls, internalEndpoints as internalUrls }
