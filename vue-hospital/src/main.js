import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
//import iView from 'iview';
import api from './api/Api'
import store from './store'
import util from './common/util'
import 'element-ui/lib/theme-chalk/index.css'
//import 'iview/dist/styles/iview.css'; 
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$util = util;
Vue.config.productionTip = false;
Vue.use(ElementUI);
//Vue.use(iView);
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
