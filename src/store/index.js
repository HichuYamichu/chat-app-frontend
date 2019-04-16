import Vue from 'vue';
import Vuex from 'vuex';
import user from './user/index';
import servers from './servers/index';
import error from './error/index';
import publicNamespace from './publicNamespace/index';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    servers,
    error,
    publicNamespace
  }
});
