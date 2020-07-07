/**
 * 后台用户相关
 */
import {
  fetch
} from './request';

export class adminuserService extends fetch {
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

  //获取用户列表
  getUserList(data) {
    return this.post('/admin/adminuser/index', data)
  }
  
  //新增用户
  addUser(data) {
    return this.post('/admin/adminuser/add', data)
  }

  //读取单条用户
  readUser(data) {
    return this.post('/admin/adminuser/details', data)
  }

  //读取单条用户
  editUser(data) {
    return this.post('/admin/adminuser/edit', data)
  }

  //删除权限
  delUser(data) {
    return this.get('/admin/adminuser/del', data)
  }

  //修改密码
  changePwd(data) {
    return this.post('/admin/adminuser/profile',  data)
  }
}