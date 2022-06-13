<script>
export default {
  name: 'MInput',
}
</script>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
})
</script>

<template>
  <input
    v-bind="$attrs"
    :type="type"
    class="border-gray-500 py-[6px] focus:border-gray-500 focus:ring-0 focus:ring-offset-0"
  />
</template>

<style scoped></style>
