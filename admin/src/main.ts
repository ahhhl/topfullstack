import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import './plugins/avue.js';
import router from './router';
import axios from 'axios';
import EleForm from 'vue-ele-form';

// 注册 vue-ele-form
Vue.use(EleForm);

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

Vue.config.productionTip = false;
// Avue upload组件请求
Vue.prototype.$axios = http;
Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
