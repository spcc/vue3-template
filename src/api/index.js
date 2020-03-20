export const basePath = process.env.NODE_ENV === 'production' ? '/apiadmin' : '/apiadmin'

export default {
  download:basePath + '',// 下载
  uoload:'/common/api/upload', // 上传
  storeUrl:{ // 店铺
    list: '/admin/goods/list', // 店铺列表
  }
}