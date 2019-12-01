import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/phone/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/ebapi/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/ebapi/login_page/login_out',
    method: 'get'
  })
}

export function getdashTop() {
  return request({
    url: '/shoe/shoe/index/AllCount',
    method: 'get'
  })
}
export function getLineChart() {
  return request({
    url: '/shoe/shoe/index/echarts',
    method: 'get'
  })
}

