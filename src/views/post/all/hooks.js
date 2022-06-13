import { reactive, ref } from 'vue'
import {
  deletePostApi,
  getPostListApi,
  setStatusApi,
  setTopApi,
} from '@/api/post'
import { useModal } from '@/plugins/modal/hooks'

export function useManagerPost() {
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0,
  })
  const postList = ref([])
  const loading = ref(false)
  const modal = useModal()

  async function getPostList() {
    let data, error, msg
    try {
      loading.value = true
      const result = await getPostListApi({
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

  async function fetchPostList() {
    try {
      const { data, error, msg } = await getPostList()
      if (error) {
        modal.show({ title: '获取文章出错', message: msg })
        return
      }
      postList.value = data.list
      pagination.total = data.total
      pagination.page = data.page
    } catch (e) {
      console.log(e)
    }
  }

  async function deletePost(id) {
    let error, msg
    try {
      loading.value = true
      await deletePostApi(id)
    } catch (e) {
      error = true
      msg = e.data.msg || e.statusText
    } finally {
      loading.value = false
    }
    return {
      error,
      msg,
    }
  }

  async function setPostTop(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await setTopApi(body)
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

  async function setPostStatus(body) {
    let data, error, msg
    try {
      loading.value = true
      const result = await setStatusApi(body)
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
    pagination,
    loading,
    postList,
    fetchPostList,
    deletePost,
    setPostTop,
    setPostStatus,
  }
}
