import { http } from '@/utils/request'

export function uploadFileApi(formData) {
  return http.request({
    url: 'file/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}
