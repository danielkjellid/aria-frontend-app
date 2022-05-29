<template>
  <transition
    enter-active-class="transition duration-300 ease-in-out transform"
    enter-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition duration-300 ease-in-out transform"
    leave-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <slot />
  </transition>
</template>
