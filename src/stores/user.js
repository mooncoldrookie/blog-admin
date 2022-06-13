import { defineStore } from 'pinia'
import defaultHead from '@/assets/avatar.png'
import { getUserInfoApi } from '@/api/account'
import { router } from '@/router'

export const roles = ['admin', 'user', 'tourist']

const defaultUserState = {
  userId: 0,
  username: '',
  email: '',
  head: defaultHead,
  role: '',
  token: '',
  routes: [],
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({ ...defaultUserState }),
  actions: {
    setToken(token) {
      this.token = token
      window.localStorage.setItem('authorization-token', token)
    },
    getToken() {
      return window.localStorage.getItem('authorization-token') || this.token
    },
    logout() {
      this.token = ''
      window.localStorage.removeItem('authorization-token')
      window.location.reload()
    },
    async getUserInfo() {
      try {
        const result = await getUserInfoApi()
        const { id, username, role, email, head } = result.data
        this.userId = id
        this.username = username
        this.role = role
        this.email = email
        this.head = head || defaultHead
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters: {
    roleName(state) {
      switch (state.role) {
        case 'admin':
          return '管理员'
        case 'user':
          return '普通用户'
        case 'tourist':
          return '游客'
        default:
          return ''
      }
    },
  },
})
