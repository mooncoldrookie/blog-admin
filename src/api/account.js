import { http } from '@/utils/request'

export function getUserInfoApi() {
  return http.request({
    url: 'account/info',
    method: 'get',
  })
}

export function UpdateAccountUsernameApi(data) {
  return http.request({
    method: 'post',
    url: 'account/updateUsername',
    data,
  })
}

export function UpdateAccountEmailApi(data) {
  return http.request({
    method: 'post',
    url: 'account/updateEmail',
    data,
  })
}
export function updateAccountHeadApi(data) {
  return http.request({
    method: 'post',
    url: 'account/updateHead',
    data,
  })
}
export function updateAccountPassword(data) {
  return http.request({
    method: 'post',
    url: 'account/updatePassword',
    data,
  })
}
