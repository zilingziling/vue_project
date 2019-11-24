import request from '@/utils/request'

export function getWareList(data) {
  return request({
    url: '/shoe/inventory',
    method: 'post',
    data
  })
}

