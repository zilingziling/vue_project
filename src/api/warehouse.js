import request from '@/utils/request'

export function getWareList(data) {
  return request({
    url: '/shoe/inventory',
    method: 'post',
    data
  })
}

export function setPrice(price) {
  return request({
    url: `/phone/user/setPrice/${price}`,
    method: 'post'
  })
}
export function getPrice() {
  return request({
    url: '/phone/user/getPrice',
    method: 'get'
  })
}
