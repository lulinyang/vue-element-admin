/**
 * 后台菜单相关
 */
import {
    fetch
  } from './request';
  
  export class adminMenuService extends fetch {
    constructor() {
      super('')
    }

  //获取权限列表
  getMenuList(data) {
    return this.post('/admin/adminmenu/index', data)
  }
  
  //新增权限
  addMenu(data) {
    return this.post('/admin/adminmenu/add', data)
  }

  //读取单条权限
  readMenu(data) {
    return this.get('/admin/adminmenu/read', data)
  }

  //读取单条权限
  editMenu(data) {
    return this.post('/admin/adminmenu/edit', data)
  }

  //删除权限
  delMenu(data) {
    return this.get('/admin/adminmenu/del', data)
  }

}