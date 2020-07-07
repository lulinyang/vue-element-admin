import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      children: [{
          path: '/home',
          component: resolve => require(['@/view/common/BaseTable.vue'], resolve),
          name: "系统首页"
        },
        {
          path: '/home/controller/list',
          component: resolve => require(['@/view/Account/AdminUser/list.vue'], resolve),
          name: '管理员列表'
        },
        {
          path: '/home/menu/list',
          component: resolve => require(['@/view/Account/Menu/list.vue'], resolve),
          name: '菜单管理'
        },
        {
          path: '/home/menu/add',
          component: resolve => require(['@/view/Account/Menu/add.vue'], resolve),
          name: '添加菜单',
        },
        {
          path: '/home/rule/list',
          component: resolve => require(['@/view/Account/Rule/list.vue'], resolve),
          name: '权限规则'
        },
        {
          path: '/home/rule/add',
          component: resolve => require(['@/view/Account/Rule/add.vue'], resolve),
          name: '添加权限'
        },
        {
          path: '/home/groups/list',
          component: resolve => require(['@/view/Account/Group/list.vue'], resolve),
          name: '用户组管理'
        },
        {
          path: '/home/groups/add',
          component: resolve => require(['@/view/Account/Group/add.vue'], resolve),
          name: '添加用户组'
        },
        {
          path: '/neditor',
          component: resolve => require(['@/view/NEditor/index.vue'], resolve),
          name: '富文本'
        },
        {
          path: '/export-excel',
          component: resolve => require(['@/view/Excel/export-excel.vue'], resolve),
          name: 'Export-excel'
        },
        {
          path: '/upload-excel',
          component: resolve => require(['@/view/Excel/upload-excel.vue'], resolve),
          name: 'Upload-excel'
        },
        {
          path: '/404',
          component: () => import('@/view/common/404.vue'),
          name: '404'
        },
        {
          path: '/403',
          component: () => import('@/view/common/403.vue'),
          name: '403'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/view/login.vue'),
      name: '登录'
    },
  ]
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}