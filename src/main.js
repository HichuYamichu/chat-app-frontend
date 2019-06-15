import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify';
import vuescroll from 'vue-scroll';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import colors from 'vuetify/es5/util/colors';
import './registerServiceWorker';

axios.defaults.withCredentials = true;
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'http://localhost:3000/api/';
// } else {
//   console.log(process.env);
//   axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`;
// }

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
Vue.use(VueAxios, axios);
Vue.use(vuescroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  async mounted() {
    const { data } = await this.axios.get('/api/users/checkLoginState');
    if (data) {
      this.$store.dispatch('syncWithSession', data);
    } else {
      this.$router.push('/login');
    }
  },
  render: h => h(App)
}).$mount('#app');
