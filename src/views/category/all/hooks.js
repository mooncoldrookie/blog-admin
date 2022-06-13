import { reactive, ref, watchEffect } from 'vue'
import {
  batchDeleteCategoryApi,
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoryApi,
  getPageCategoryApi,
  updateCategoryApi,
} from '@/api/category'
import { useModal } from '@/plugins/modal/hooks'

export function useCategory() {
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0,
  })

  const loading = ref(false)

  async function fetchPageCategory() {
    let data, error, msg
    try {
      loading.value = true
      const result = await getPageCategoryApi({
        offset: (pagination.page - 1) * pagination.size,
        limit: pagination.size,
      })
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

  async function addCategory(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await createCategoryApi(body)
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

  async function updateCategory(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await updateCategoryApi(body)
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

  async function deleteCategory(id) {
    let data, error, msg
    try {
      loading.value = true
      const result = await deleteCategoryApi(id)
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

  async function batchDeleteCategory(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await batchDeleteCategoryApi(body)
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
    fetchPageCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    batchDeleteCategory,
  }
}

export function useGetAllCategory() {
  const categoryList = ref([])
  const modal = useModal()
  watchEffect(async () => {
    try {
      const { data, error, msg } = await getAllCategories()
      if (error) {
        modal.show({ title: '获取数据失败', message: msg })
        return
      }
      categoryList.value = data
    } catch (e) {
      console.log(e)
    }
  })

  async function getAllCategories() {
    let data, error, msg
    try {
      const result = await getAllCategoryApi()
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
  return { categoryList, getAllCategories }
}
