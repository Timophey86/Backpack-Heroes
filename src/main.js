import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import locale from "element-ui/lib/locale/lang/en";
import store from "./store";
import "./assets/main.scss";
import Msg from 'vue-message'
import 'element-ui/lib/theme-chalk/base.css';
import VueSweetalert2 from 'vue-sweetalert2';


Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(require("vue-moment"));
Vue.use(Msg, {
  text: 'Hello world', duration: 3000, background: 'rgba(7,17,27,0.6)'
})
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
