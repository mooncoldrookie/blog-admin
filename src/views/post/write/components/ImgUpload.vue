<script>
export default {
  name: 'ImgUpload',
}
</script>

<script setup>
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import Popper from 'vue3-popper'

defineProps({
  imgSrc: String,
})

const emit = defineEmits(['addFile', 'removeFile'])

const fileInput = ref()

const showFileChooserDialog = throttle(
  () => {
    if (fileInput.value) {
      fileInput.value.dispatchEvent(new MouseEvent('click'))
    }
  },
  1500,
  { trailing: false }
)

const removeFile = () => {
  if (fileInput.value) {
    fileInput.value.value = null
  }
  emit('removeFile')
}
</script>

<template>
  <div class="text-xs text-gray-500">
    <div
      class="h-24 w-40 min-w-0 overflow-hidden rounded-xl border-dashed border-gray-400"
      :class="[imgSrc ? '' : 'border']"
    >
      <Popper v-if="imgSrc" hover offset-distance="-66" arrow>
        <div class="h-24 w-40 min-w-0 cursor-pointer">
          <img
            id="coverImg"
            class="h-full w-full min-w-0 max-w-full object-cover"
            :src="imgSrc"
            alt=""
          />
        </div>

        <template #content>
          <div
            id="popper"
            class="flex h-9 items-center gap-2 rounded bg-gray-900 px-2 text-sm text-white opacity-75"
          >
            <button @click="showFileChooserDialog">更换</button>
            <div class="h-3 w-[1px] bg-gray-50"></div>
            <button @click="removeFile">删除</button>
          </div>
        </template>
      </Popper>

      <label
        class="flex h-full w-full cursor-pointer items-center justify-center"
        :class="[imgSrc ? 'hidden' : '']"
      >
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          class="hidden"
          @change="$emit('addFile', $event)"
          ref="fileInput"
        />

        <div v-if="!imgSrc" class="flex items-center">
          <m-icon icon="plus" />
          <span>添加文章封面</span>
        </div>
      </label>
    </div>

    <div class="mt-2">仅支持 .jpeg .jpg .png 格式的图片</div>
  </div>
</template>

<style scoped></style>
