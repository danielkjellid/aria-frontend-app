/* eslint-disable arrow-body-style */
export default defineNuxtPlugin(() => {
  const statuses = useProductStatus()

  return {
    provide: {
      getStatusName: (value: string | number) => {
        const val = value.toString()
        return statuses.find((status) => status.value === val).name
      },
    },
  }
})
