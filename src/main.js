// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';


import "./common/http"
import "./common/element"

import ElementUI from 'element-ui';
//将element注册成vue的插件
import 'element-ui/lib/theme-chalk/index.css';
// 导入公用的css文件
import "./assets/css/reset.css"

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
Vue.prototype.$imgBaUrl="http://localhost:3000"

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
