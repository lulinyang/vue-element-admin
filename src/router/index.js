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
          name: '系统首页',
          component: resolve => require(['@/view/home.vue'], resolve)
        },
        {
          path: '/baseTable',
          component: resolve => require(['@/view/page-content/BaseTable.vue'], resolve),
          name: '基础表格'
        },
        {
          path: '/neditor',
          component: resolve => require(['@/view/NEditor/index.vue'], resolve),
          name: '富文本'
        },
        {
          path: '/excel',
          component: resolve => require(['@/view/Excel/index.vue'], resolve),
          name: 'Excel'
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
    {
      path: '*',
      redirect: '/404'
    }
  ]
});