import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      meta: {
        title: ''
      },
      children: [{
          path: '/home',
          component: resolve => require(['@/view/common/BaseTable.vue'], resolve),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/home/user/list',
          component: resolve => require(['@/view/Account/AdminUser/list.vue'], resolve),
          meta: {
            title: '管理员列表'
          }
        },
        {
          path: '/home/menu/list',
          component: resolve => require(['@/view/Account/Menu/list.vue'], resolve),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/home/menu/edit/:id',
          name: 'menuEdit',
          component: resolve => require(['@/view/Account/Menu/edit.vue'], resolve),
          meta: {
            title: '编辑菜单'
          }
        },
        {
          path: '/home/rule/list',
          component: resolve => require(['@/view/Account/Rule/list.vue'], resolve),
          meta: {
            title: '权限规则'
          }
        },
        {
          path: '/home/rule/add',
          component: resolve => require(['@/view/Account/Rule/add.vue'], resolve),
          meta: {
            title: '添加权限'
          }
        },
        {
          path: '/home/groups/list',
          component: resolve => require(['@/view/Account/Group/list.vue'], resolve),
          meta: {
            title: '用户组管理'
          }
        },
        {
          path: '/neditor',
          component: resolve => require(['@/view/NEditor/index.vue'], resolve),
          meta: {
            title: '富文本'
          }
        },
        {
          path: '/neditor',
          component: resolve => require(['@/view/NEditor/index.vue'], resolve),
          meta: {
            title: '富文本'
          }
        },
        {
          path: '/404',
          component: () => import('@/view/common/404.vue'),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: () => import('@/view/common/403.vue'),
          meta: {
            title: '403'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/view/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}