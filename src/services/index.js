/* eslint-disable */
import {  //后台用户相关
  ucenterService
} from '@/services/service.ucenter.js'

import {  //权限节点相关
  adminRuleService
} from '@/services/service.adminrule.js'

import {  //权限节点相关
  adminMenuService
} from '@/services/service.adminmenu.js'


export const UcenterService = new ucenterService();
export const AdminRule = new adminRuleService();
export const AdminMenu = new adminMenuService();
