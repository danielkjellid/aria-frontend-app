import { reactive } from 'vue'

const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const sm = (val: number) => val >= screenSizes.sm && val <= screenSizes.md
const md = (val: number) => val >= screenSizes.md && val <= screenSizes.lg
const lg = (val: number) => val >= screenSizes.lg && val <= screenSizes.xl
const xl = (val: number) => val >= screenSizes.xl && val <= screenSizes['2xl']
const xl2 = (val: number) => val >= screenSizes['2xl']

const getBreakpoint = (w: number) => {
  if (sm(w)) return 'sm'
  if (md(w)) return 'md'
  if (lg(w)) return 'lg'
  if (xl(w)) return 'xl'
  if (xl2(w)) return '2xl'

  return 'default'
}

const debounce = (func: Function, wait: number) => {
  let timeout: any

  return () => {
    const later = () => {
      timeout = null
    }

    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func()
  }
}

const breakpointData = reactive({
  w: process.client ? window.innerWidth : null,
  h: process.client ? window.innerHeight : null,
  is: getBreakpoint(process.client ? window.innerWidth : null),
})

if (process.client) {
  window.addEventListener(
    'resize',
    debounce(() => {
      breakpointData.w = window.innerWidth
      breakpointData.h = window.innerHeight
      breakpointData.is = getBreakpoint(window.innerWidth)
    }, 200),
    false
  )
}

export default breakpointData
