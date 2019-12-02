import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

console.log(process)
// 全局引入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
