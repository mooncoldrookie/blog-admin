import { reactive, ref, watchEffect } from 'vue'
import { getCaptchaApi, loginApi } from '@/api/base'
import { testPassword, testUsername, testVerifyCode } from '@/utils'

const defaultValidation = {
  // 登录表单整体状态
  // 有任何一项未通过都会设为false
  form: {
    valid: true,
    msg: '',
  },
  username: {
    valid: true,
    msg: '',
  },
  password: {
    valid: true,
    msg: '',
  },
  verifyCode: {
    valid: true,
    msg: '',
  },
}

const defaultLoginState = {
  username: '',
  password: '',
  captchaId: '',
  verifyCode: '',
}

export function useLogin() {
  let loginState = reactive(defaultLoginState)
  // 表单验证
  let validationState = reactive(defaultValidation)
  // 重置表单验证状态
  function resetValidation() {
    Object.keys(validationState).forEach((key) => {
      validationState[key].valid = true
      validationState[key].msg = ''
    })
  }

  function validate() {
    if (!loginState.username.trim()) {
      validationState.username.valid = false
      validationState.username.msg = '请输入用户名'
      validationState.form.valid = false
      return
    }
    if (!testUsername(loginState.username)) {
      validationState.username.valid = false
      validationState.username.msg = '用户名格式不正确'
      validationState.form.valid = false
      return
    }
    if (!loginState.password.trim()) {
      validationState.password.valid = false
      validationState.password.msg = '请输入密码'
      validationState.form.valid = false
      return
    }
    if (!testPassword(loginState.password)) {
      validationState.password.valid = false
      validationState.password.msg = '密码格式不正确'
      validationState.form.valid = false
      return
    }
    if (!loginState.verifyCode.trim()) {
      validationState.verifyCode.valid = false
      validationState.verifyCode.msg = '请输入验证码'
      validationState.form.valid = false
      return
    }
    if (!testVerifyCode(loginState.verifyCode)) {
      validationState.verifyCode.valid = false
      validationState.verifyCode.msg = '验证码格式错误'
      validationState.form.valid = false
      return
    }
    resetValidation()
  }

  async function login() {
    const state = {}
    try {
      const result = await loginApi(loginState)
      state.data = result.data
    } catch (error) {
      state.error = true
      state.msg = error.msg
      state.code = error.code
    }
    return state
  }

  watchEffect(() => {
    const username = window.localStorage.getItem('login-username')
    if (username) {
      loginState.username = username
    }
  })

  return {
    loginState,
    login,
    validate,
    resetValidation,
    validationState,
  }
}

export function useCaptcha() {
  const captcha = reactive({
    img: '',
    id: '',
  })

  async function getCaptcha() {
    try {
      const result = await getCaptchaApi(120, 60)
      if (result.success) {
        const data = result.data
        captcha.id = data.id
        captcha.img = data.img
      }
    } catch (e) {}
  }
  function useTimeout(time) {
    const ready = ref(true)
    const countDown = ref(time)
    const start = (fn) => {
      if (!ready.value) return
      fn()
      ready.value = false
      if (countDown.value > 0) {
        const timer = setInterval(() => {
          countDown.value--
          if (countDown.value <= 0) {
            ready.value = true
            countDown.value = time
            clearInterval(timer)
          }
        }, 1000)
      }
    }
    return { ready, countDown, start }
  }

  watchEffect(async () => {
    await getCaptcha()
  })

  return {
    captcha,
    getCaptcha,
    useTimeout,
  }
}
