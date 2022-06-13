<script>
export default {
  name: 'AvatarEditor',
}
</script>

<script setup>
import { useUserStore } from '@/stores/user'
import { provide, ref } from 'vue'
import { uploadFileApi } from '@/api/file'
import MButton from '@/components/MButton'
import AvatarCropper from '@/views/account/info/components/AvatarCropper'
import { nanoid } from 'nanoid'
import { updateAccountHeadApi } from '@/api/account'

const user = useUserStore()
const visible = ref(false)
const head = ref(user.head)
const cropper = ref()
const cropperImage = ref()
// 用于销毁重置cropper
const isAliveCropper = ref(true)
const onChangeFile = async (e) => {
  const file = e.target.files[0]
  if (file === undefined || file == null) {
    return
  }
  cropperImage.value = URL.createObjectURL(file)
  isAliveCropper.value = true
  visible.value = true

  // let data = new FormData()
  // data.append('file', file)
  // try {
  //   const result = await uploadFileApi(data)
  //   head.value = result.data.path
  // } catch (e) {
  //   console.log(e.data.msg || e.statusText)
  // }
}

const onCancel = () => {
  visible.value = false
  isAliveCropper.value = false
}

const saveAvatar = () => {
  cropper.value
    .getCroppedCanvas({
      imageSmoothingQuality: 'high',
    })
    .toBlob(async (blob) => {
      const file = new window.File([blob], nanoid(), { type: blob.type })
      let data = new FormData()
      data.append('file', file)
      try {
        const result = await uploadFileApi(data)
        console.log(result.data.path)
        await updateAccountHeadApi({ head: result.data.path })
        await user.getUserInfo()
      } catch (e) {
        console.log(e.data.msg || e.statusText)
      } finally {
        visible.value = false
        isAliveCropper.value = false
      }
    }, 'image/jpeg')
}

provide('cropper', cropper)
</script>

<template>
  <div>
    <div class="relative h-36 w-36 overflow-hidden rounded-lg border">
      <img
        :src="user.head"
        alt=""
        class="h-full w-full min-w-0 max-w-full object-cover object-center"
      />
      <label
        class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 bg-black bg-opacity-30 text-white transition hover:bg-opacity-40"
      >
        <m-icon icon="solid-camera" class="text-3xl" />
        修改我的头像
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          class="hidden"
          ref="fileInput"
          @change="onChangeFile"
        />
      </label>
    </div>
    <a-modal v-model:visible="visible" :maskClosable="false" :closable="false">
      <div class="flex flex-col items-center">
        <div class="text-xl font-bold">编辑头像</div>
        <div class="mt-2 text-gray-500">调整头像位置和尺寸</div>
        <div class="py-12">
          <avatar-cropper :image="cropperImage" v-if="isAliveCropper" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-center gap-12">
          <m-button bg="w" size="l" @click="onCancel">取消</m-button>
          <m-button size="l" @click="saveAvatar">保存</m-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<style scoped></style>
