<script>
export default {
  name: 'EmailEditor',
}
</script>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import MButton from '@/components/MButton'
import { isEmail } from '@/utils'
import { useModal } from '@/plugins/modal/hooks'
import { UpdateAccountEmailApi } from '@/api/account'
import { nextTick } from 'vue'
const user = useUserStore()

const isEdit = ref(false)
const inputValue = ref('')
const modal = useModal()
const emailInput = ref()

const onEdit = (e) => {
  e.preventDefault()
  isEdit.value = true
  inputValue.value = user.email
  nextTick(() => {
    emailInput.value.focus()
  })
}
const onCancelEdit = (e) => {
  isEdit.value = false
}
const onSubmit = async (e) => {
  e.preventDefault()
  if (!isEmail(inputValue.value)) {
    modal.show({ message: '邮箱格式错误' })
    return
  }
  if (inputValue.value === user.email) {
    modal.show({ message: '新邮箱和原邮箱相同' })
    return
  }
  try {
    await UpdateAccountEmailApi({ email: inputValue.value })
    isEdit.value = false
    await user.getUserInfo()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form class="field-content border-b py-8 transition" @submit="onSubmit">
    <h4 class="absolute leading-9">邮箱</h4>
    <div
      v-if="!isEdit"
      class="flex w-[600px] items-center gap-4 pl-36 text-base leading-9"
    >
      <span>{{ user.email || '未设置' }}</span>
      <button
        @click="onEdit"
        class="button-edit inline-flex items-center justify-center gap-1 text-cyan-800 transition"
      >
        <m-icon icon="pen" />
        编辑
      </button>
    </div>
    <div v-else class="w-[600px] pl-36 leading-9">
      <input type="text" class="w-full" v-model="inputValue" ref="emailInput" />
      <div class="mt-4 flex gap-8">
        <m-button bg="w" @click="onCancelEdit">取消</m-button>
        <m-button @click="onSubmit">保存</m-button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.button-edit {
  visibility: hidden;
  opacity: 0;
}
.field-content:hover .button-edit {
  visibility: visible;
  opacity: 1;
}
</style>
