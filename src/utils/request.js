import axios from 'axios'
// import { Message } from 'iview'
import { basePath } from '../api/index'
const qs = require('qs')

// 提示函数
const tip = msg => {
  alert(msg)
  // Message.error({
  //   content: msg
  // })
}

// axios基本配置
axios.defaults.timeout = 50000

// http request 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) config.headers['token'] = token
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// http response 响应拦截器
axios.interceptors.response.use(
  response => {
    let { code, msg } = response.data
    if (code && code !== 0) {
      tip(msg)
      // if (code == 999 || code == 995) {
      //   sessionStorage.removeItem('admin-token');
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 1500)
      // }
    }
    return response.data
  },
  error => {
    const { response } = error
    errorHandle(response.status)
    return Promise.reject(response)
  }
)

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status) => {
  switch (status) {
    case 400:
      tip('400:请求错误')
      break
    case 401:
      tip('401:未授权，请登录')
      break
    case 403:
      tip('403:拒绝访问')
      break
    case 404:
      tip(`404:请求地址出错`)
      break
    case 408:
      tip('408:请求超时')
      break
    case 500:
      tip('500:服务器内部错误')
      break
    case 501:
      tip('501:服务未实现')
      break
    case 502:
      tip('502:网关错误')
      break
    case 503:
      tip('503:服务不可用')
      break
    case 504:
      tip('504:网关超时')
      break
    case 505:
      tip('505:HTTP版本不受支持')
      break
    default:
      console.log('失败')
  }
}

const path = basePath
const http = {
  /**
   * post 请求方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(path + url, qs.stringify(data)).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  /**
   * get 请求方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(path + url, { params: data }).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch(function (error) { // 加上catch
        console.log(error)
      })
    })
  },
  /**
   * put 请求方法
   * @param url
   * @param id
   * @param data
   * @returns {Promise}
   */
  put(url, id, data) {
    return new Promise((resolve, reject) => {
      axios.put(path + url + id, data).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch(function (error) { // 加上catch
        console.log(error)
      })
    })
  },
  /**
   * delete 请求方法
   * @param url
   * @param id
   * @returns {Promise}
   */
  delete(url, id) {
    return new Promise((resolve, reject) => {
      axios.delete(path + url + id).then(response => {
        resolve(response)
      }, err => {
        resolve(err)
        // reject(err,222222)
      }).catch(function (error) { // 加上catch
        resolve(error)
        console.log(error, 111111)
      })
    })
  },
  /**
   * delete 请求方法
   * @param url
   * @param arr 传数组
   * @returns {Promise}
   */
  patch(url, param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      axios.patch(path + url + param.join('/')).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch(function (error) { // 加上catch
        console.log(error)
      })
    })
  },
  /**
   * delete 请求方法
   * @param url
   * @param arr 传数组
   * @returns {Promise}
   */
  patch_body(url, param) {
    return new Promise((resolve, reject) => {
      axios.patch(path + url, param).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch(function (error) { // 加上catch
        console.log(error)
      })
    })
  },
  /**
   * post 请求方法  请求类型为application/json
   * @param url
   * @param data
   * @returns {Promise}
   */
  json_post(url, data) {
    let param = {}
    if (data) {
      for (let i in data) {
        if (Object.prototype.toString.call(data[i]) != '[object Array]' && Object.prototype.toString.call(data[i]) != '[object Date]') {
          data[i] = xss(data[i])
        }
      }
      param = JSON.stringify(data)
    }
    return new Promise((resolve, reject) => {
      axios.post(path + url, param, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(response => {
        resolve(response)
      }, err => {
        reject(err)
        console.log(err, 'err')
      }).catch(err => {
        console.log(err, '1111')
      })
    })
  },
  exportExcel(url, data) {
    console.log(data)

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: path + url,
        data: qs.stringify(data),
        responseType: 'blob'
      }).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  file(url, params, callback) {
    var data = new FormData()
    for (var key in params) {
      data.append(key, params[key])
    }
    return new Promise((resolve, reject) => {
      axios({
        url: path + url,
        method: 'post',
        data: data,
        onUploadProgress: progressEvent => {
          var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          callback && callback(complete)
          // this.progress = complete
        }
      }).then(res => {
        resolve(res);
      })
    })
  }
}

export default http