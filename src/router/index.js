import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/login',
    component: () => import('@/view/login.vue'),
    name: 'login',
    meta: {
      title: '登录',
      keepAlive: false
    }
  }, {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import('../components/common/Home.vue'),
    children: [{
      path: '/home',
      component: resolve => require(['@/view/common/BaseTable.vue'], resolve),
      name: "home",
      meta: {
        title: '系统首页',
        keepAlive: false
      }
    },
    {
      path: '/home/controller/list',
      component: resolve => require(['@/view/Account/AdminUser/list.vue'], resolve),
      name: 'homeControllerList',
      meta: {
        title: '管理员列表',
        keepAlive: false
      }
    },
    {
      path: '/home/controller/add',
      component: resolve => require(['@/view/Account/AdminUser/add.vue'], resolve),
      name: 'homeControllerAdd',
      meta: {
        title: '添加管理员',
        keepAlive: true
      }
    },
    {
      path: '/home/menu/list',
      component: resolve => require(['@/view/Account/Menu/list.vue'], resolve),
      name: 'homeMenuList',
      meta: {
        title: '菜单管理',
        keepAlive: false
      }
    },
    {
      path: '/home/menu/add',
      component: resolve => require(['@/view/Account/Menu/add.vue'], resolve),
      name: 'homeMenuAdd',
      meta: {
        title: '添加菜单',
        keepAlive: false
      }
    },
    {
      path: '/home/rule/list',
      component: resolve => require(['@/view/Account/Rule/list.vue'], resolve),
      name: 'homeRuleList',
      meta: {
        title: '权限规则',
        keepAlive: false
      }
    },
    {
      path: '/home/rule/add',
      component: resolve => require(['@/view/Account/Rule/add.vue'], resolve),
      name: 'homeRuleAdd',
      meta: {
        title: '添加权限',
        keepAlive: true
      }
    },
    {
      path: '/home/groups/list',
      component: resolve => require(['@/view/Account/Group/list.vue'], resolve),
      name: 'homeGroupsList',
      meta: {
        title: '用户组管理',
        keepAlive: false
      }
    },
    {
      path: '/home/groups/add',
      component: resolve => require(['@/view/Account/Group/add.vue'], resolve),
      name: 'homeGroupsAdd',
      meta: {
        title: '添加用户组',
        keepAlive: true
      }
    },
    {
      path: '/changepwd',
      component: resolve => require(['@/view/changepwd.vue'], resolve),
      name: 'changepwd',
      meta: {
        title: '修改登录密码',
        keepAlive: true
      }
    },
    {
      path: '/neditor',
      component: resolve => require(['@/view/NEditor/index.vue'], resolve),
      name: 'neditor',
      meta: {
        title: '富文本',
        keepAlive: false
      }
    },
    {
      path: '/export-excel',
      component: resolve => require(['@/view/Excel/export-excel.vue'], resolve),
      name: 'Export-excel',
      meta: {
        title: 'Export-excel',
        keepAlive: false
      }
    },
    {
      path: '/upload-excel',
      component: resolve => require(['@/view/Excel/upload-excel.vue'], resolve),
      name: 'upload-excel',
      meta: {
        title: 'Upload-excel',
        keepAlive: false
      }
    },
    {
      path: '/404',
      component: () => import('@/view/common/404.vue'),
      name: '404',
      meta: {
        title: '404',
        keepAlive: false
      }
    },
    {
      path: '/403',
      component: () => import('@/view/common/403.vue'),
      name: '403',
      meta: {
        title: '403',
        keepAlive: false
      }
    },
    {
      path: '*',
      redirect: '/404'
    },
    ]
  },

  ]
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}