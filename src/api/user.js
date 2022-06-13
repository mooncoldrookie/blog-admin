import { http } from '@/utils/request'

export function addUserApi(data) {
  return http.request({
    method: 'post',
    url: '/user',
    data,
  })
}
