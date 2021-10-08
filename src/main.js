import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import './axios'
import simpleUtils from "@/utils/simpleUtils";
import 'github-markdown-css/github-markdown.css';
import Prism from 'prismjs';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import QRCode from "qrcodejs2";

Vue.use(Prism);
Vue.use(ElementUI);
// Vue.use(QRCode);

Vue.prototype.$axios = axios
Vue.prototype.$simpleUtils = simpleUtils
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
