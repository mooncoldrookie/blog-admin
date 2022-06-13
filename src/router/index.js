import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { routes } from './routes'
import { getToken } from '@/utils/token'
import { useUserStore } from '@/stores/user'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const token = getToken()

  if (token) {
    const user = useUserStore()
    await user.getUserInfo()
    if (to.path === '/login') {
      next('/')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
