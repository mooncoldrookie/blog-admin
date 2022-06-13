import { getCurrentInstance } from 'vue'

export function useModal() {
  const instance = getCurrentInstance()
  return instance.appContext.config.globalProperties.$modal
}
