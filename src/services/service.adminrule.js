/**
 * 后台权限节点相关
 */
import {
    fetch
  } from './request';
  
  export class adminRuleService extends fetch {
    constructor() {
      super('')
    }

  //获取权限列表
  getRuleList(data) {
    return this.post('/admin/adminrule/index', data)
  }
  
  //新增权限
  addRule(data) {
    return this.post('/admin/adminrule/add', data)
  }

  //读取单条权限
  readRule(data) {
    return this.get('/admin/adminrule/read', data)
  }

  //读取单条权限
  editRule(data) {
    return this.post('/admin/adminrule/edit', data)
  }

  //删除权限
  delRule(data) {
    return this.get('/admin/adminrule/del', data)
  }

}