// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
// import VeeValidate from 'vee-validate'
import axios from 'axios'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import vueCalendar from "vue2-simple-calendar";

Vue.use(BootstrapVue)
Vue.use(vueCalendar, {
  // configuration goes here.
});

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:3333'

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
