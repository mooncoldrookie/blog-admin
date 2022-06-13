import Axios from 'axios'
import { getToken } from '@/utils/token'
import Modal from 'ant-design-vue/lib/modal'
import { useUserStore } from '@/stores/user'
import message from 'ant-design-vue/lib/message'

const http = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
})

http.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      return config
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  },
  (error) => {
    const response = error.response

    // 网络错误
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      // message.error('网络错误，未连接到服务器')
      return Promise.reject(response)
    }

    // 取消请求错误
    if (Axios.isCancel(error)) {
      return Promise.reject(response)
    }
    const user = useUserStore()

    // 业务错误
    if (response.data && response.data.code >= 10000) {
      Modal.info({
        content: response.data.msg,
      })
      return Promise.reject(response)
    }
    // 无权限
    if (
      response.status === 403 ||
      (response.data && response.data.code === 403)
    ) {
      message.error('您没有权限进行此操作')
      return Promise.reject(response)
    }
    // 未登录或登录过期
    if (
      response.status === 401 ||
      (response.data && response.data.code === 401)
    ) {
      Modal.info({
        content: '登录已过期，请前往登录',
        onCancel() {
          user.logout()
        },
        onOk() {
          user.logout()
        },
      })
      return Promise.reject(response)
    }
    // 接口请求出错
    if (
      response.status === 400 ||
      (response.data && response.data.code === 400)
    ) {
      message.error('请求出错，请重试或联系开发人员')
      return Promise.reject(response)
    }
    // 服务器错误
    if (
      response.status >= 500 ||
      (response.data && response.data.code >= 500)
    ) {
      message.error('服务器错误')
      return Promise.reject(response)
    }
    message.error(response.statusText || response.data.msg || '未知错误')
    return Promise.reject(response)
  }
)

export { http }
