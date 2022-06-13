<script>
export default {
  name: 'LoginPage',
}
</script>

<script setup>
import { ref } from 'vue'
import { useCaptcha, useLogin } from './hooks'
import { useRouter } from 'vue-router'
import LoginInput from '@/views/login/components/login-input'
import MIcon from '@/components/MIcon'
import { useUserStore } from '@/stores/user'

const { captcha, getCaptcha, useTimeout } = useCaptcha()

const { loginState, validationState, login, resetValidation, validate } =
  useLogin()
const { ready, countDown, start } = useTimeout(10)

const loading = ref(false)
const buttonText = ref('登 录')
// 进入页面重置
buttonText.value = '登 录'
const router = useRouter()
const user = useUserStore()

function switchErrorMsg(code, msg) {
  switch (code) {
    case 10002:
      validationState.verifyCode.msg = msg
      break
    case 10003:
      validationState.username.msg = msg
      break
    default:
      validationState.username.msg = '登录失败'
  }
}

const submit = async () => {
  try {
    loading.value = true
    validate()
    if (!validationState.form.valid) return
    loginState.captchaId = captcha.id
    const state = await login()
    if (state.error) {
      switchErrorMsg(state.code, state.msg)
      return
    }
    buttonText.value = '登录成功'
    user.setToken(state.data.token)
    // 重置表单
    loginState.password = ''
    loginState.verifyCode = ''
    // 本地保存用户名
    window.localStorage.setItem('login-username', loginState.username)
    await router.push('/')
  } catch (e) {
  } finally {
    loading.value = false
  }
}

// 倒计时 节流获取验证码请求
const throttleGet = () => {
  if (!ready.value) return
  start(getCaptcha)
}
</script>

<template>
  <div class="login-container h-full bg-white bg-login bg-cover bg-center">
    <div class="mx-auto flex h-full items-center justify-center lg:container">
      <!--      login-panel-->
      <div
        class="login-panel flex w-[400px] flex-col overflow-hidden rounded-2xl shadow-md"
      >
        <!--        login header-->
        <div
          class="bg-gradient-to-r from-gray-500 to-gray-900 py-8 text-center text-white"
        >
          <h1 class="text-3xl">博客管理</h1>
          <p>sunmoon</p>
        </div>
        <!--        login content-->
        <div class="bg-white px-5 py-10 pb-20">
          <!--        login form-->
          <div class="space-y-4 rounded-lg">
            <login-input
              label="用户名"
              v-model="loginState.username"
              @focus="resetValidation"
              :error-msg="validationState.username.msg"
              class="text-lg"
            >
              <template #left-icon>
                <m-icon icon="user"></m-icon>
              </template>
            </login-input>
            <login-input
              label="密码"
              type="password"
              v-model="loginState.password"
              @focus="resetValidation"
              :error-msg="validationState.password.msg"
              class="text-lg"
            >
              <template #left-icon>
                <m-icon icon="key"></m-icon>
              </template>
            </login-input>
            <div class="flex items-center justify-between gap-1">
              <login-input
                v-model="loginState.verifyCode"
                label="图片验证码"
                @focus="resetValidation"
                :error-msg="validationState.verifyCode.msg"
                class="w-0 flex-grow"
              />
              <img
                :src="captcha.img"
                alt="图片验证码"
                @click="throttleGet"
                class="mb-[21px] h-[60px] w-[120px] flex-none cursor-pointer"
              />
              <button
                @click="throttleGet"
                :disabled="!ready"
                class="flex w-8 cursor-pointer items-center justify-center text-lg"
              >
                <m-icon v-if="ready" icon="arrow-rotate-right"></m-icon>
                <span v-else class="text-base text-gray-400">
                  {{ countDown }}
                </span>
              </button>
            </div>
            <button
              class="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600 disabled:bg-blue-400"
              @click="submit"
              :disabled="loading"
            >
              <m-icon
                v-if="loading"
                icon="spinner-third"
                class="animate-spin"
              ></m-icon>
              <span>{{ buttonText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-panel {
  background-color: #f7f7f7;
}
</style>
