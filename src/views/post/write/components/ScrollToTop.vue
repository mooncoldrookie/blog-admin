<script>
export default {
  name: 'ScrollToTop',
}
</script>

<script setup>
import { scrollTo } from 'seamless-scroll-polyfill'

const backToTop = () =>
  scrollTo(window, { behavior: 'smooth', top: 0, left: 0 })
</script>

<template>
  <button @click="backToTop" class="flex items-center text-gray-500">
    <span>回到顶部</span>
    <m-icon class="ml-2" icon="arrow-up-to-line" />
  </button>
</template>

<style scoped></style>
