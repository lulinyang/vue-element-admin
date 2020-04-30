import api from './interApi'
import qs from 'qs'

class axiosApi {
	constructor() {

	}

	sendGet(url, params = {}) { // get 请求
		if (Object.prototype.toString.call(params) === '[object Object]') {
      var param =  qs.stringify(params) !== '' ? '?' + qs.stringify(params) : qs.stringify(params);
			return api.creatAxios.get(url + param)
		} else {
			const error = new Error('参数错误！')
			try {
				throw error
			} catch (e) {
			}
		}
	}

  sendPost (url, params = {}) { // post 请求
    if (Object.prototype.toString.call(params) === '[object Object]') {
      return api.creatAxios.post(url, params)
    } else {
      const error = new Error('参数错误！')
      try {
        throw error
      } catch (e) {
        // console.log(e)
      }
    }
  }

  /**
   * 并发请求，同时发送多个请求，使用栗子：src/views/infoEntry/dragCard/dragCardService.js
   * 顺序和请求发送的顺序相同
   * @param {arr: [请求1,请求2...]}
   */

  sendAll (arr) { // 并发请求
    return new Promise((resolve, reject) => {
      api.sendAll(arr).then(res => {
        return resolve(res)
      })
    })
  }

}

export default axiosApi