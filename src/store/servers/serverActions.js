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
      commit('ADD_MESSAGE', { serverName: server.serverName, channelName: data.channel, data: data.message });
    });

    server.namespace.on('updateActiveUsers', data => {
      commit('UPDATE_ACTIVE_USERS', { userList: data, serverName: server.serverName });
    });

    commit('ADD_SERVER', server);
  },

  async joinServer({ dispatch }, serverName) {
    const { data } = await axios.get(
      `servers/join?serverName=${serverName}`
    );
    dispatch('loadServer', data);
  },

  async createServer({ dispatch, rootState }, serverData) {
    try {
      const { data } = await axios.post(
        'servers/new-server',
        {
          'serverName': serverData.serverName,
          'description': serverData.description,
          'private': serverData.private,
          'owner': rootState.user.user.username
        }
      );
      dispatch('loadServer', data);
    } catch (error) {
      throw error;
    }
  },

  leaveServer({ commit, getters }, serverName) {
    router.push('/');
    getters.servers.find(server => server.serverName === serverName).namespace.emit('leaveServer');
    commit('LEAVE_SERVER', serverName);
  }
};

export default actions;
