export const basePath = process.env.NODE_ENV === 'production' ? '/common' : '/api/common'

export default {
  download:basePath + '',// 下载
  uoload:'/common/api/upload', // 上传
  storeUrl:{
    register : '/common/api/business/register', // 商户注册
    login : '/common/login', // 登录
    code : '/common/sms/login/send', // 发送验证码
    baseConfig : '/common/store/settle/config ', // 基本配置
    apply : '/common/store/settle/qualification', // 申请店铺
  },
  mallUrl: {
    getDetail: '/common/product/detail', // 获取鲸选商品详情
  }
}