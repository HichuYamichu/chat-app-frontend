import io from 'socket.io-client';
import router from '@/router';

const actions = {
  connectToPublic({ commit, dispatch }) {
    let pathPrefix;
    if (process.env.VUE_APP_NGINX_PROXY) {
      pathPrefix = `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_NGINX_PROXY}`;
    } else if (process.env.VUE_APP_BASE_URL) {
      pathPrefix = process.env.VUE_APP_BASE_URL;
    } else {
      pathPrefix = 'http://localhost:3000';
    }
    const namespace = io(`${pathPrefix}/public`);
    namespace.on('serverCreated', server => {
      dispatch('loadServer', server, { root: true });
      router.push(`/servers/${server._id}/${server.channels[0]._id}`);
    });

    namespace.on('joinedServer', server => {
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

  joinServer({ dispatch, getters }, serverID) {
    getters.publicNamespace.emit('joinServer', serverID);
  },

  disconnectMain({ commit, getters }) {
    getters.publicNamespace.emit('logout');
    commit('CLEAR');
  }
};

export default actions;
