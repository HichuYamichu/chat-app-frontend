import axios from 'axios';
import router from '@/router';

const actions = {
  async register({ commit }, credentials) {
    try {
      const user = await axios.post(
        'users/register',
        {
          username: credentials.username,
          password: credentials.password,
          memberOf: []
        }
      );
      commit('SET_USER', user.data);
    } catch (error) {
      commit('DISPLAY_ERROR', error, { root: true });
    }
  },
  async login({ commit, dispatch }, credentials) {
    try {
      const res = await axios.post('users/login', {
        username: credentials.username,
        password: credentials.password
      });
      commit('SET_USER', res.data.user);
      res.data.servers.forEach(server => {
        dispatch('loadServer', server, { root: true });
      });
      router.push('/');
    } catch (error) {
      commit('DISPLAY_ERROR', error, { root: true });
    }
  },
  logout({ commit, dispatch }) {
    router.push('/login');
    commit('LOGOUT');
    dispatch('handleLoguot', null, { root: true });
    axios.get('users/logout');
  }
};
export default actions;
