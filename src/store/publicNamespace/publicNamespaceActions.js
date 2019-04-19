import io from 'socket.io-client';
import router from '@/router';

const actions = {
  connectToPublic({ commit, dispatch }) {
    console.log('connectiong');
    const namespace = io(`http://localhost:3000/public`);
    namespace.on('serverCreated', server => {
      dispatch('loadServer', server, { root: true });
      router.push(`/servers/${server.serverName}`);
    });

    namespace.on('joinedServer', server => {
      console.log(server);
      dispatch('loadServer', server, { root: true });
    });

    namespace.on('errorOccured', error => {
      console.log(error);
      commit('DISPLAY_ERROR', error);
    });

    commit('SET_PUBLIC_NAMESPACE', namespace);
  },
  createServer({ commit, dispatch, rootState, getters }, serverData) {
    getters.publicNamespace.emit('createServer', serverData);
  },

  joinServer({ dispatch, getters }, serverName) {
    getters.publicNamespace.emit('joinServer', serverName);
  },

  disconnectMain({ commit, getters }) {
    getters.publicNamespace.emit('logout');
    commit('CLEAR');
  }
};

export default actions;