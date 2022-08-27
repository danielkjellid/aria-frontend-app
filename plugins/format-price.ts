/* eslint-disable arrow-body-style */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatPrice: (value: string | number) => {
        if (value === undefined || value === null) return ''

        // Convert to int and enforce two decimal points.
        const val = typeof value === 'string' ? parseInt(value, 10) : value
        const newValue = val.toFixed(2)

        // Replace "." with ",".
        return newValue.replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
    },
  }
})
