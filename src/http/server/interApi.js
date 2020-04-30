// interApi.js
import axios from 'axios'
import store from '@/store/index'
import VueCookies from 'vue-cookies'
import { Message } from 'element-ui'
import router from '../../router/index';
import qs from 'qs'

// 配置 axios，并生成实例
const creatAxios = axios.create({
  // baseURL: config.baseUrl,
  withCredentials: true,
})

// 拦截器配置
// 请求拦截 在发送请求之前做些什么
creatAxios.interceptors.request.use(configData => { 
  configData.withCredentials = false;
  return configData
}, error => { // 请求失败做的事情
  return Promise.reject(error)
})

// 响应拦截 对响应数据做点什么
creatAxios.interceptors.response.use(response => { 
  if(response.data.code !== 1) {
    Message.error(response.data.msg);
    return Promise.reject(response);
  }
  return response.data;
}, error => { // 响应失败做的事
  switch (error.response.status) {
    case 500:
      Message.error('服务器内部错误，请联系开发人员！');
      break;
    case 403: 
      Message.error('服务器理解请求客户端的请求，但是拒绝执行此请求！');
      break;
    case 405:
      Message.error('客户端请求中的方法被禁止，请联系开发人员！');
      break;
    case 401:
      router.push('/login');
      break;
      case 408: 
      Message.error('请求超时！');
      break;
  }

  return Promise.reject(error.response);
})

function sendAll(arr) { // 顺序和请求发送的顺序相同，使用 axios.spread 分割成多个单独的响应对象
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return axios.all(arr).then(axios.spread(function (...res) { // axios.all 是axios的静态方法，不是实例上的方法
      // 请求全部都执行完成
      return Promise.resolve(res)
    }))
  } else {
    const error = new Error('参数错误！')
    try {
      throw error
    } catch (e) {
      // console.log(e)
    }
  }
}

export default {
  creatAxios,
  sendAll
}