import { http } from '@/utils/request'

export function getPageTagApi(params) {
  return http.request({ method: 'get', url: '/tag', params })
}

export function getAllTagApi() {
  return http.request({ method: 'get', url: '/tag/all' })
}

export function createTagApi(data) {
  return http.request({ method: 'post', url: '/tag', data })
}

export function updateTagApi(id, data) {
  return http.request({ method: 'patch', url: '/tag/' + id, data })
}

export function deleteTagApi(id) {
  return http.request({ method: 'delete', url: '/tag/' + id })
}

export function batchDeleteTagApi(data) {
  return http.request({ method: 'post', url: '/tag/batch', data })
}
