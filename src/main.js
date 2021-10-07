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

Vue.use(Prism);

Vue.prototype.$axios = axios
Vue.prototype.$simpleUtils = simpleUtils

Vue.use(ElementUI);
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
