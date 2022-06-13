import { reactive, ref } from 'vue'
import {
  batchDeleteTagApi,
  createTagApi,
  deleteTagApi,
  getAllTagApi,
  getPageTagApi,
  updateTagApi,
} from '@/api/tag'
import { useModal } from '@/plugins/modal/hooks'
import { watchEffect } from 'vue'

export function useTag() {
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0,
  })

  const loading = ref(false)

  async function getPageTag(params) {
    let data, error, msg
    try {
      loading.value = true
      const result = await getPageTagApi(params)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    } finally {
      loading.value = false
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function addTag(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await createTagApi(body)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    } finally {
      loading.value = false
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function updateTag(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await updateTagApi(body)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    } finally {
      loading.value = false
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function deleteTag(id) {
    let data, error, msg
    try {
      loading.value = true
      const result = await deleteTagApi(id)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    } finally {
      loading.value = false
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function batchDeleteTag(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await batchDeleteTagApi(body)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    } finally {
      loading.value = false
    }
    return {
      data,
      error,
      msg,
    }
  }

  return {
    loading,
    pagination,
    getPageTag,
    addTag,
    updateTag,
    deleteTag,
    batchDeleteTag,
  }
}

export function useGetAllTag() {
  const tagList = ref([])
  const modal = useModal()
  watchEffect(async () => {
    try {
      const { data, error, msg } = await getAllTag()
      if (error) {
        modal.show({ title: '获取数据失败', message: msg })
        return
      }
      tagList.value = data
    } catch (e) {
      console.log(e)
    }
  })

  async function getAllTag() {
    let data, error, msg
    try {
      const result = await getAllTagApi()
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    } finally {
    }
    return {
      data,
      error,
      msg,
    }
  }
  return {
    tagList,
    getAllTag,
  }
}
