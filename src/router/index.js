import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '' },
            children: [
                {
                    path: '/home',
                    component: resolve => require(['@/view/home.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/404',
                    component: () => import('@/view/common/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('@/view/common/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/view/login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});