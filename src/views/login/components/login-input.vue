<script>
export default {
  name: 'LoginInput',
}
</script>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String,
  errorMsg: String,
  useMsg: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const focus = ref(false)

function emitValue(e) {
  let val = e.target.value
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex flex-col bg-white">
    <label class="p-1 text-xs text-gray-500">{{ label }}</label>
    <label
      class="flex items-center justify-around gap-2 border-b-2 px-2 transition"
      :class="{ 'border-b-blue-900': focus }"
    >
      <slot name="left-icon"></slot>
      <input
        :value="modelValue"
        @input="emitValue"
        :type="type"
        v-bind="$attrs"
        @focus="focus = true"
        @blur="focus = false"
        class="flex-1 rounded-md border-none outline-none focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
      />
      <span class="flex h-5 w-5 items-center justify-center text-green-500">
        <ion-icon v-if="valid" name="checkmark-sharp"></ion-icon>
      </span>
    </label>
    <label v-if="useMsg" class="h-6 p-1 text-sm text-red-500 line-clamp-1">
      {{ errorMsg }}
    </label>
  </div>
</template>
