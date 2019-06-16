import Vue from 'vue';
import Router from 'vue-router';
import _Server from './views/Server';
import Register from './views/Register';
import Login from './views/Login';
import NewServerForm from './views/NewServerForm';
import UserPanel from './views/UserPanel';
import Home from './views/Home';
import store from './store/index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_NGINX_PROXY ? process.env.VUE_APP_NGINX_PROXY : '',
  routes: [
    {
      path: '/',
      name: 'Chat-app',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/user',
      component: UserPanel,
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/servers/:serverID/:channelID',
      name: 'Server',
      component: _Server,
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          if (to.params.serverID) {
            store.getters.servers.find(server => server._id === to.params.serverID).isActive = true;
          }
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/new',
      name: 'NewServerForm',
      component: NewServerForm,
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
});
