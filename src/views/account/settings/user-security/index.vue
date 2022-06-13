<script>
import MButton from '@/components/MButton'
export default {
  name: 'UserSecurityView',
  components: { MButton },
}
</script>

<script setup>
import { useUserSecurity } from '@/views/account/settings/user-security/hooks'
import { updateAccountPassword } from '@/api/account'
import { useModal } from '@/plugins/modal/hooks'

const { state, resetState, isValid, checkForm } = useUserSecurity()
const modal = useModal()

const submit = async (e) => {
  e.preventDefault()
  checkForm()
  if (!isValid.value) return
  try {
    await updateAccountPassword({
      new: state.new,
      old: state.old,
    })
    resetState()
    modal.show({ message: '修改成功' })
  } catch (e) {
    modal.show({ message: e.msg })
  }
}
</script>

<template>
  <div>
    <form @submit="submit">
      <div class="field">
        <h4>
          原密码
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <input class="field-input" type="password" v-model="state.old" />
        </div>
      </div>
      <div class="field">
        <h4>
          新密码
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <input class="field-input" type="password" v-model="state.new" />
        </div>
      </div>
      <div class="field">
        <h4>
          确认新密码
          <span class="text-red-500">*</span>
        </h4>
        <div class="field-content">
          <input
            class="field-input"
            type="password"
            v-model="state.confirmNew"
          />
        </div>
      </div>
      <div class="mt-8">
        <m-button size="l" class="ml-40 w-64" @click="submit">保存</m-button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
