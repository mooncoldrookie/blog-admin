<script>
import '../assets/font/fontawesome'
export default {
  name: 'MIcon',
  props: ['icon'],
}
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${icon || ''}`"></use>
  </svg>
</template>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
