<script>
export default {
  name: 'BlogSettings',
}
</script>

<script setup>
import { reactive, watchEffect } from 'vue'
import MButton from '@/components/MButton'
import { useModal } from '@/plugins/modal/hooks'
import { getConfigsApi, updateConfigsApi } from '@/api/config'

const state = reactive({
  siteName: '',
  author: '',
  intro: '',
  description: '',
  desktopHomeBanner: '',
  mobileHomeBanner: '',
  footerGreeting: '',
  avatar: '',
  aboutBanner: '',
})
const modal = useModal()

const submit = async () => {
  try {
    const result = await updateConfigsApi(state)
    if (result.success) {
      modal.show({ message: '更新成功' })
    } else {
      modal.show({ message: result.msg })
    }
  } catch (e) {}
}

async function getConfigs() {
  try {
    const result = await getConfigsApi()
    if (result.success) {
      Object.assign(state, result.data)
    } else {
      modal.show({ message: result.msg })
    }
  } catch (e) {}
}

watchEffect(() => {
  getConfigs()
})
</script>

<template>
  <div>
    <form class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h6>站点名称</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.siteName"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>博主作者名</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.author"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>桌面端首页背景图</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.desktopHomeBanner"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>移动端首页背景图</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.mobileHomeBanner"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>页脚问候语</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.footerGreeting"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>博客头像</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.avatar"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>简介页面背景图</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.aboutBanner"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>个人签名</h6>
        <div class="w-[600px]">
          <input
            class="config-input"
            type="text"
            maxlength="100"
            placeholder="最多100个字符"
            v-model="state.intro"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h6>博客描述</h6>
        <div class="w-[600px]">
          <textarea
            class="config-textarea"
            maxlength="1000"
            rows="5"
            placeholder="最多1000个字符"
            v-model="state.description"
          />
        </div>
      </div>

      <div class="flex w-[600px]">
        <m-button size="l" @click="submit">提交</m-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@tailwind components;
@layer components {
  .config-input {
    @apply h-10 w-full border border-gray-400 p-[2px] px-[2px] outline-none focus:border focus:ring-0;
  }
  .config-textarea {
    @apply w-full resize-none border border-gray-400 p-[2px] px-[2px] outline-none focus:border focus:ring-0;
  }
}
</style>
