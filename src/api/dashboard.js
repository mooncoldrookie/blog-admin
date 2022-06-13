import { http } from '@/utils/request'

export function getVisitsChartData(days) {
  return http.request({
    method: 'GET',
    url: '/log/visitsChartData',
    params: {
      days,
    },
  })
}

export function getBlogStatistics() {
  return http.request({
    method: 'GET',
    url: '/log/blogStatistics',
  })
}

export function getLoginLog(params) {
  return http.request({
    method: 'GET',
    url: '/log/login',
    params,
  })
}
