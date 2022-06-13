<script>
export default {
  name: 'MButton',
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    required: false,
    default: 'm',
    validator(value) {
      return ['s', 'n', 'l', 'm'].includes(value)
    },
  },
  bg: {
    type: String,
    required: false,
    default: 'n',
    validator(value) {
      return ['n', 'r', 'g', 'b', 'w'].includes(value)
    },
  },
})

const sizeStyles = computed(() => {
  switch (props.size) {
    case 's':
      return 'px-2 py-1'
    case 'm':
      return 'px-3 py-2'
    case 'l':
      return 'px-5 py-2'
    case 'n':
      return ''
    default:
      return 'px-6 py-2'
  }
})
const bgStyles = computed(() => {
  switch (props.bg) {
    case 'w':
      return 'bg-gray-100  hover:bg-gray-50 text-black'
    case 'r':
      return 'bg-rose-500 hover:bg-rose-400 text-white'
    case 'g':
      return 'bg-green-500 hover:bg-green-400 text-white'
    case 'b':
      return 'bg-blue-500 hover:bg-blue-400 text-white'
    case 'n':
      return 'bg-cyan-500 hover:bg-cyan-400 text-white'
    default:
      return 'bg-cyan-500 hover:bg-cyan-400 text-white'
  }
})
</script>

<template>
  <button
    type="button"
    :class="[
      sizeStyles,
      bgStyles,
      'inline-flex justify-center rounded border-none text-sm  outline-none transition focus:outline-none',
    ]"
  >
    <slot></slot>
  </button>
</template>
