import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/main.scss'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(require('vue-moment'));


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
