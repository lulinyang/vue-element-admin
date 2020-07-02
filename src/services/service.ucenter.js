/* eslint-disable */
import {
  fetch
} from './request';

export class ucenterService extends fetch {
  constructor() {
    super('')
  }

  /* 测试
   */
  getTopicList(data) {
    return this.post('/api/Topic/TopicList', data)
  }

  /**
   * 登录
   */
  userLogin(data){
    return this.post('/admin/auth/login', data)
  }
}