<script>
export default {
  name: 'UserAddView',
}
</script>

<script setup>
import MButton from '@/components/MButton'
import { useModal } from '@/plugins/modal/hooks'
import { useUserAdd } from '@/views/account/settings/user-add/hooks'
import { addUserApi } from '@/api/user'

const { formState, confirmPassword, checkForm, isValid, resetState } =
  useUserAdd()
const modal = useModal()

const submit = async (e) => {
  e.preventDefault()
  checkForm()
  if (!isValid.value) return
  const form = { ...formState }
  if (form.email === '') {
    delete form.email
  }
  try {
    await addUserApi(form)
    // 成功后清空表单
    resetState()
    modal.show({ message: '注册成功' })
  } catch (e) {
    modal.show({ message: e.msg })
  }
}
</script>

<template>
  <div>
    <form class="flex flex-col" @submit="submit">
      <div class="field">
        <h4>
          用户名
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <input class="field-input" type="text" v-model="formState.username" />
        </div>
      </div>
      <div class="field">
        <h4>邮箱</h4>
        <div class="field-content">
          <input class="field-input" type="text" v-model="formState.email" />
        </div>
      </div>
      <div class="field">
        <h4>
          权限
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                v-model="formState.role"
                value="user"
              />
              普通用户
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                v-model="formState.role"
                value="tourist"
              />
              游客
            </label>
          </div>
        </div>
      </div>
      <div class="field">
        <h4>
          密码
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <input
            class="field-input"
            type="password"
            v-model="formState.password"
          />
        </div>
      </div>
      <div class="field">
        <h4>
          确认密码
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <input
            class="field-input"
            type="password"
            v-model="confirmPassword"
          />
        </div>
      </div>

      <div class="mt-8">
        <m-button size="l" class="ml-40 w-64" @click="submit">提交</m-button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
