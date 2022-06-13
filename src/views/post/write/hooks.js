import { ref } from 'vue'
import { uploadFileApi } from '@/api/file'
import {
  addNewPostApi,
  getEditPostApi,
  getPostByIdApi,
  updatePostApi,
} from '@/api/post'

export function useUpload() {
  const coverImg = ref('')
  const selectFile = ref()

  async function addCoverImg(e) {
    selectFile.value = e.target.files[0]
    if (selectFile.value === undefined) {
      return
    }
    let data = new FormData()
    data.append('file', selectFile.value)
    try {
      const result = await uploadFileApi(data)
      coverImg.value = result.data.path
    } catch (e) {
      console.log(e.data.msg || e.statusText)
    }
  }

  function removeFile() {
    selectFile.value = null
    coverImg.value = ''
  }

  return {
    coverImg,
    selectFile,
    addCoverImg,
    removeFile,
  }
}

export function useWrite() {
  async function getPost(id) {
    let data, error, msg
    try {
      const result = await getPostByIdApi(id)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function getEditPost(id) {
    let data, error, msg
    try {
      const result = await getEditPostApi(id)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function addNewPost(body) {
    let data, error, msg
    try {
      const result = await addNewPostApi(body)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    }
    return {
      data,
      error,
      msg,
    }
  }

  async function updatePost(id, body) {
    let data, error, msg
    try {
      const result = await updatePostApi(id, body)
      data = result.data
    } catch (e) {
      error = true
      data = e.data
      msg = e.data.msg || e.statusText
    }
    return {
      data,
      error,
      msg,
    }
  }

  return {
    getPost,
    addNewPost,
    updatePost,
    getEditPost,
  }
}
