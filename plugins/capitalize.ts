/* eslint-disable arrow-body-style */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      capitalize: (value: string) => {
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
    },
  }
})
