import { isEmail, testPassword, testUsername } from '@/utils'
import { reactive, ref } from 'vue'
import { useModal } from '@/plugins/modal/hooks'

export function useUserAdd() {
  const defaultState = {
    username: '',
    email: '',
    role: 'user',
    password: '',
  }
  const formState = reactive({ ...defaultState })

  const modal = useModal()

  const confirmPassword = ref('')
  const isValid = ref(false)

  function resetState() {
    Object.assign(formState, defaultState)
    confirmPassword.value = ''
  }

  function checkForm() {
    isValid.value = false
    if (formState.username === '') {
      modal.show({ message: '用户名不能为空' })
      return
    }
    if (!testUsername(formState.username)) {
      modal.show({ message: '用户名格式不正确' })
      return
    }
    if (formState.email !== '' && !isEmail(formState.email)) {
      modal.show({ message: '邮箱格式不正确' })
      return
    }
    if (formState.password === '') {
      modal.show({ message: '密码不能为空' })
      return
    }
    if (!testPassword(formState.password)) {
      modal.show({ message: '密码格式不正确' })
      return
    }
    if (confirmPassword.value !== formState.password) {
      modal.show({ message: '确认密码不一致' })
      return
    }
    isValid.value = true
  }

  return {
    formState,
    confirmPassword,
    checkForm,
    isValid,
    resetState,
  }
}
