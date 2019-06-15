import axios from 'axios';
import router from '@/router';

const actions = {
  async register({ commit, dispatch }, credentials) {
    try {
      const user = await axios.post('/api/users/register', {
        username: credentials.username,
        password: credentials.password,
        memberOf: []
      });
      commit('SET_USER', user.data);
      dispatch('connectToPublic', null, { root: true });
      router.push('/');
    } catch (error) {
      commit('DISPLAY_ERROR', error, { root: true });
    }
  },
  async login({ commit, dispatch }, credentials) {
    try {
      const res = await axios.post('/api/users/login', {
        username: credentials.username,
        password: credentials.password
      });
      commit('SET_USER', res.data.user);
      dispatch('connectToPublic', null, { root: true });
      res.data.servers.forEach(server => {
        dispatch('loadServer', server, { root: true });
      });
      router.push('/');
    } catch (error) {
      commit('DISPLAY_ERROR', error, { root: true });
    }
  },
  syncWithSession({ commit, dispatch }, data) {
    commit('SET_USER', data.user);
    dispatch('connectToPublic', null, { root: true });
    data.servers.forEach(server => {
      dispatch('loadServer', server, { root: true });
    });
    router.push('/');
  },
  logout({ commit, dispatch }) {
    router.push('/login');
    commit('LOGOUT');
    dispatch('handleLoguot', null, { root: true });
    axios.get('/api/users/logout');
  }
};
export default actions;
