import { reactive, watchEffect } from 'vue'
import { getLoginLog } from '@/api/dashboard'
import { shallowRef } from 'vue'

export function useLog() {
  const pagination = reactive({
    size: 5,
    total: 0,
    page: 1,
  })
  const loginLogs = shallowRef([])

  async function fetchLoginLogs() {
    try {
      const result = await getLoginLog({
        limit: pagination.size,
        offset: (pagination.page - 1) * pagination.size,
      })
      const { list, total } = result.data
      loginLogs.value = list
      pagination.total = total
    } catch (e) {
      console.log(e)
    }
  }

  watchEffect(async () => {
    await fetchLoginLogs()
  })

  return {
    pagination,
    loginLogs,
  }
}
