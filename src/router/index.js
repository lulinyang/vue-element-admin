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
        path: '/translate',
        component: resolve => require(['@/view/Translate/index.vue'], resolve),
        name: 'translate',
        meta: {
          title: '画图',
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