/* eslint-disable */
import {  //后台用户相关
  adminuserService
} from '@/services/service.adminuser.js'

import {  //权限节点相关
  adminRuleService
} from '@/services/service.adminrule.js'

import {  //权限节点相关
  adminMenuService
} from '@/services/service.adminmenu.js'


import {  //权限节点相关
  adminGroupService
} from '@/services/service.admingroup.js'


export const AdminUser = new adminuserService();
export const AdminRule = new adminRuleService();
export const AdminMenu = new adminMenuService();
export const AdminGroup = new adminGroupService();
