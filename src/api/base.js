import { http } from '@/utils/request'

export function getCaptchaApi(width, height) {
  return http.request({
    method: 'get',
    url: '/captcha/img',
    params: {
      width,
      height,
    },
  })
}

export function loginApi(loginBody) {
  return http.request({
    method: 'post',
    url: '/login',
    data: loginBody,
  })
}
