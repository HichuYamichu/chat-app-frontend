import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

const actions = {
  loadServer({ commit }, server) {
    server.namespace = Vue.$addServer(server.serverName);
    server.currentChannel = 'main';
    server.isActive = false;
    server.activeUsers = [];
    server.namespace.emit(
      'init',
      server.channels.map(channel => channel.channelName)
    );

    server.namespace.on('messageRecived', data => {
      commit('ADD_MESSAGE', {
        serverName: server.serverName,
        channelName: data.channel,
        data: data.message
      });
    });

    server.namespace.on('updateMessages', data => {
      data.serverName = server.serverName;
      commit('APPEND_MESSAGES', data);
    });

    server.namespace.on('updateActiveUsers', data => {
      commit('UPDATE_ACTIVE_USERS', {
        userList: data,
        serverName: server.serverName
      });
    });

    server.namespace.on('serverDelete', data => {
      server.namespace.removeAllListeners();
      if (server.isActive) router.push('/');
      commit('LEAVE_SERVER', data);
    });

    server.namespace.on('addChannel', data => {
      commit('ADD_CHANNEL', { channel: data, serverName: server.serverName });
    });

    server.namespace.on('channelDeleted', data => {
      commit('REMOVE_CHANNEL', { serverName: server.serverName, channelName: data });
    });

    server.namespace.on('errorOccured', error => {
      commit('DISPLAY_ERROR', error);
    });

    commit('ADD_SERVER', server);
  },

  async joinServer({ dispatch }, serverName) {
    const { data } = await axios.get(`servers/join?serverName=${serverName}`);
    dispatch('loadServer', data);
  },

  async createServer({ commit, dispatch, rootState }, serverData) {
    try {
      const { data } = await axios.post('servers/new-server', {
        'serverName': serverData.serverName,
        'description': serverData.description,
        'private': serverData.private,
        'owner': rootState.user.user.username
      });
      dispatch('loadServer', data);
      router.push(`/servers/${serverData.serverName}`);
    } catch (error) {
      commit('DISPLAY_ERROR', error);
    }
  },

  leaveServer({ commit, getters }, serverName) {
    router.push('/');
    getters.servers
      .find(server => server.serverName === serverName)
      .namespace.emit('leaveServer');
    commit('LEAVE_SERVER', serverName);
  },

  deleteServer({ commit, getters }, serverName) {
    router.push('/');
    getters.servers
      .find(server => server.serverName === serverName)
      .namespace.emit('deleteServer');
  },

  handleLoguot({ commit, getters }) {
    getters.servers.forEach(server => {
      server.namespace.emit('logout');
    });
    getters.servers.forEach(server => {
      server.namespace.removeAllListeners();
    });
    commit('CLEAR_STATE');
  }
};

export default actions;
