import { http } from '@/utils/request'

export function getPageCategoryApi(params) {
  return http.request({ method: 'get', url: '/category', params })
}

export function getAllCategoryApi() {
  return http.request({ method: 'get', url: '/category/all' })
}

export function createCategoryApi(data) {
  return http.request({ method: 'post', url: '/category', data })
}

export function updateCategoryApi(id, data) {
  return http.request({ method: 'patch', url: '/category/' + id, data })
}

export function deleteCategoryApi(id) {
  return http.request({ method: 'delete', url: '/category/' + id })
}

export function batchDeleteCategoryApi(data) {
  return http.request({ method: 'post', url: '/category/batch', data })
}
