import { http } from '@/utils/request'

export function getPostByIdApi(id) {
  return http.request({ method: 'get', url: '/post/' + id })
}

export function getEditPostApi(id) {
  return http.request({ method: 'get', url: '/post/edit/' + id })
}

export function addNewPostApi(data) {
  return http.request({ method: 'post', url: '/post', data })
}

export function getPostListApi(params) {
  return http.request({ method: 'get', url: '/post', params })
}

export function deletePostApi(id) {
  return http.request({ method: 'delete', url: '/post/' + id })
}

export function updatePostApi(id, data) {
  return http.request({ method: 'patch', url: '/post/' + id, data })
}

export function setTopApi(data) {
  return http.request({ method: 'post', url: '/post/setTop', data })
}

export function setStatusApi(data) {
  return http.request({ method: 'post', url: '/post/setStatus', data })
}
