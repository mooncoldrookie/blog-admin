import { http } from '@/utils/request'

export function getConfigsApi() {
  return http.request({
    method: 'get',
    url: 'config',
  })
}

export function updateConfigsApi(data) {
  return http.request({
    method: 'patch',
    url: 'config',
    data,
  })
}
