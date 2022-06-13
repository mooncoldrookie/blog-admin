<script>
export default {
  name: 'ItemAdd',
}
</script>

<script setup>
import MButton from '@/components/MButton'
import MIcon from '@/components/MIcon'
import { computed, ref, watchEffect } from 'vue'
import { inject } from 'vue'

const isInputFocus = ref(false)
const input = ref(null)

const props = defineProps({
  modelValue: String,
  isUpdate: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['update:modelValue', 'on-click'])

const buttonIcon = computed(() => (props.isUpdate ? 'check' : 'plus'))
const { onAddOrUpdate } = inject('input')

const onInputKeyup = (e) => {
  if (e.keyCode === 13) {
    onAddOrUpdate()
  }
}

// 设置光标位置在文字最后
const onfocus = (e) => {
  const editTask = e.srcElement
  const len = editTask.value.length
  editTask.focus()
  isInputFocus.value = true
  setTimeout(() => {
    editTask.selectionStart = len
    editTask.selectionEnd = len
  })
}

watchEffect(() => {
  if (props.isUpdate) {
    // 等待同步操作完成后再操作
    setTimeout(() => {
      input.value.focus()
    })
  }
})
</script>

<template>
  <!--添加项目-->
  <div
    :class="[isInputFocus && 'border-gray-500']"
    class="inline-block flex w-fit items-center overflow-hidden rounded-full border p-[2px] pl-2"
  >
    <input
      ref="input"
      type="text"
      v-bind="$attrs"
      :value="modelValue"
      @focus="onfocus($event)"
      @blur="isInputFocus = false"
      class="w-96 border-none border-gray-500 py-[6px] focus:border-gray-500 focus:ring-0 focus:ring-offset-0"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="onInputKeyup($event)"
    />
    <m-button
      @click="$emit('on-click')"
      size="n"
      class="rounded-full bg-gray-100 p-3 text-xl font-bold"
    >
      <m-icon :icon="buttonIcon" />
    </m-button>
  </div>
</template>

<style scoped></style>
