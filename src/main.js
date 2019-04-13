import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import socket from './plugins/socket';
import './registerServiceWorker';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify';
import vuescroll from 'vue-scroll';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import colors from 'vuetify/es5/util/colors';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000/api/';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    base: colors.grey.darken4,
    primary: colors.cyan.accent1,
    secondary: colors.grey.darken3,
    tertiary: colors.grey.darken2,
    accent: colors.green.accent2,
    accent2: colors.green.accent2

  }
});
Vue.use(socket);
Vue.use(VueAxios, axios);
Vue.use(vuescroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
