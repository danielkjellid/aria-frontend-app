/* eslint-disable arrow-body-style */
export default defineNuxtPlugin(() => {
  const statuses = useProductStatus()

  return {
    provide: {
      getStatusName: (value: string | number) => {
        console.log(typeof value)
        const val = typeof value === 'string' ? parseInt(value, 10) : value
        console.log(val)
        return Object.keys(statuses).find((key) => statuses[key] === val)
      },
    },
  }
})
