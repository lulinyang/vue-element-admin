/**
 * 后台用户组相关
 */
import {
    fetch
  } from './request';
  
  export class adminGroupService extends fetch {
    constructor() {
      super('')
    }

  //获取用户组列表
  getGroupList(data) {
    return this.post('/admin/admingroup/index', data)
  }
  
  //新增用户组
  addGroup(data) {
    return this.post('/admin/admingroup/add', data)
  }

  //读取单条用户组
  readGroup(data) {
    return this.get('/admin/admingroup/read', data)
  }

  //读取单条用户组
  editGroup(data) {
    return this.post('/admin/admingroup/edit', data)
  }

  //删除用户组
  delGroup(data) {
    return this.get('/admin/admingroup/del', data)
  }

}