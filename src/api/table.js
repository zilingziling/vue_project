import request from '@/utils/request'

// 获取仓库信息
export function getList(params) {
  return request({
    url: '/shoe/inventory',
    method: 'post',
    params
  })
}

// 获取商品详情
export function getGoodsInfo(params) {
  return request({
    url: '/ebapi/index_page/get_goods_info',
    method: 'get',
    params
  })
}
// 获取商品码数
export function getGoodsSize(params) {
  return request({
    url: '/ebapi/index_page/cansize',
    method: 'get',
    params
  })
}
export function getSize(params) {
  return request({
    url: '/shoe/inventory/sizeList',
    method: 'post',
    params
  })
}
// 入库
export function addSize(params) {
  return request({
    url: '/shoe/inventory/add',
    method: 'post',
    data:{
      ...params
    }
  })
}
// 删除仓库数据
export function delectItem(params) {
  return request({
    url: '/shoe/inventory/deleteAll',
    method: 'post',
    data:{
      ...params
    }
  })
}

// 卖鞋
export function sale(params) {
  return request({
    url: '/shoe/inventory/sell',
    method: 'post',
    data:{
      ...params
    }
  })
}

// 搜索
export function search(params) {
  return request({
    url: '/shoe/shoe',
    method: 'get',
    params
  })
}
// 入库
export function storage(params) {
  return request({
    url: '/shoe/inventory/add',
    method: 'post',
    params
  })
}

// 根据id入库
export function idStorage(params) {
  return request({
    url: '/ebapi/index_page/uphotpro',
    method: 'post',
    params
  })
}
// 日志
export function getLog(params) {
  return request({
    url: '/shoe/inventoryLog',
    method: 'get',
    params
  })
}
// 获取卖出list
export function getSoldList(params) {
  return request({
    url: '/shoe/inventory/sizeList',
    method: 'post',
     params
  })
}
