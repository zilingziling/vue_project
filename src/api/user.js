import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ebapi/login_page',
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

export function jishu() {
  return request({
    url: '/ebapi/index_page/jishu',
    method: 'get'
  })
}

