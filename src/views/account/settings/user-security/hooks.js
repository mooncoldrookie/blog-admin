import { reactive, ref } from 'vue'
import { isEmail, testPassword, testUsername } from '@/utils'
import { useModal } from '@/plugins/modal/hooks'

export function useUserSecurity() {
  const initialState = {
    old: '',
    new: '',
    confirmNew: '',
  }
  const state = reactive({ ...initialState })
  const isValid = ref(false)
  const modal = useModal()

  function resetState() {
    Object.assign(state, initialState)
  }

  function checkForm() {
    isValid.value = false
    if (state.old === '') {
      modal.show({ message: '原密码不能为空' })
      return
    }
    if (state.new === '') {
      modal.show({ message: '新密码不能为空' })
      return
    }
    if (!testPassword(state.new)) {
      modal.show({ message: '新密码格式不正确' })
      return
    }
    if (state.confirmNew !== state.new) {
      modal.show({ message: '确认新密码不一致' })
      return
    }
    isValid.value = true
  }

  return {
    state,
    resetState,
    isValid,
    checkForm,
  }
}
