// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lottie from 'vue-lottie'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$ajax = axios
Vue.component('lottie',lottie);


//路由跳转前做判断
router.beforeEach((to, from, next) => {; //从cookies中获取是否已登陆过的信息
  if (document.cookie.length!==0) {
    next();
    console.log(`欢迎你：${document.cookie.split(';')[0].split('=')[1]}`);
  } else {
    if (to.path == '/user') {
      next();
    } else {
      next('/user');
      if(next('/user')){
        alert('请输入用户名和密码');
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
