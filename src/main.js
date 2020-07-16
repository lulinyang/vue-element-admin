import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
  messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import MyPlugin from '@/tools/myPlugin' //自定义全局方法
import store from '@/store/index'
import VueCookies from 'vue-cookies'
import Lockr from 'lockr' //缓存Api
import _ from 'lodash' //lodash


import 'vue-fabric/dist/vue-fabric.min.css';
import { Fabric } from 'vue-fabric';
Vue.use(Fabric);
//配置文件
Vue.prototype.$config = require('@/config/index');
Vue.config.productionTip = false;
Vue.use(MyPlugin);
Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
  messages
});
Vue.use(VueCookies)

//全局
window.Lockr = Lockr; //缓存Api
window._ = _//lodash
window.router = router; //全局路由
window.store = store; //缓存Api

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('authKey');
    if (!role && to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  });