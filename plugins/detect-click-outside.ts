/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { DirectiveBinding } from 'vue'

export interface ClickOutsideElement extends HTMLElement {
  __vueClickEventHandler__: any
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
      const clickEventHandler = (event: MouseEvent) => {
        if (!el.contains(event.target as HTMLElement) && el !== event.target) {
          binding.value(event)
        }
      }

      el.__vueClickEventHandler__ = clickEventHandler

      document.addEventListener('click', clickEventHandler)
    },
    unmounted(el: ClickOutsideElement) {
      document.removeEventListener('click', el.__vueClickEventHandler__)
    },
  })
})
