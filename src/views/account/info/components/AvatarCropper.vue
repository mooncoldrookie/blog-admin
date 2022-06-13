<template>
  <div class="cropper-content flex flex-col">
    <!-- 剪裁框 -->
    <div class="cropper">
      <img ref="imageRef" :src="image" alt="" />
    </div>
    <div
      class="mt-12 flex items-center justify-center gap-2 text-xl text-gray-500"
    >
      <m-icon icon="magnifying-glass-minus" />
      <a-slider
        v-model:value="zoomVal"
        :min="0"
        :max="1"
        :step="0.01"
        @change="onSliderChange"
        class="w-64"
      />
      <m-icon icon="magnifying-glass-plus" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarCropper',
}
</script>
<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { inject, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'

const props = defineProps({
  image: String,
  autoCropWidth: {
    type: Number,
    default: 1,
  },
  autoCropHeight: {
    type: Number,
    default: 1,
  },
})

const cropper = inject('cropper')

const imageRef = ref('')
const zoomVal = ref(0)

const beforeZoomVal = ref(0)
function onSliderChange(val) {
  let range = val - beforeZoomVal.value
  beforeZoomVal.value = val
  cropper.value.zoom(range)
}

onMounted(() => {
  cropper.value = new Cropper(imageRef.value, {
    cropBoxResizable: false,
    cropBoxMovable: false,
    viewMode: 1,
    dragMode: 'move',
    background: false,
    autoCropArea: 1,
    zoomOnWheel: false,
    aspectRatio: props.autoCropWidth / props.autoCropHeight,
    guides: false,
    modal: true,
    highlight: false,
  })
})
</script>
<style lang="scss" scoped>
.cropper {
  overflow: hidden;
  max-height: 470px;
}
</style>
