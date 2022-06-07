/* eslint-disable arrow-body-style */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatPrice: (value: string | number) => {
        if (!value) return ''

        const newValue = value.toString()
        return newValue.replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
    },
  }
})
