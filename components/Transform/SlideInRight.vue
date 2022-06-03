<template>
  <Transition
    enter-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <slot />
  </Transition>
</template>
