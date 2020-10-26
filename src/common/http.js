import Vue from 'vue';
// 每一个组件可能都会用到axios，所以需要放到原型上
import axios from "axios"
import {Message} from "element-ui"

// 配置一个请求拦截器
axios.interceptors.request.use(function(config){
    // console.log(config);
    // 从本地存储中获取token
    const userInfo=JSON.parse(sessionStorage.getItem("userInfo") || '{}');
    //authorization要注意这个单词一定不能出错。
    config.headers.authorization=userInfo.token;
    return config;
});
  // 响应拦截器
axios.interceptors.response.use(function(config){
  // 判断状态码, 如果code==403, 说明登录超时, 需要重新登录
  if(config.data.code==403){
    // 错误提示
    Message({
      type:"error",
      Message:config.data.msg
    });
    // 重定向到login
    // 错误的做法: this.$router.push();
    location.href="#/login";
  }
    return config.data;
});
Vue.prototype.$http=axios;

export default axios;