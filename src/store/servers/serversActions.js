import axios from 'axios';
import Vue from 'vue';

const actions = {
  async createServer({ commit, rootState }, serverName) {
    try {
      const server = await axios.post(
        'http://localhost:3000/api/servers/new-server',
        {
          serverName: serverName,
          owner: rootState.user.user.username,
          channels: [{ messages: [], channelName: 'main' }]
        }
      );
      server.namespace = Vue.$addServer(serverName);
      server.activeChannel = 'main';
      commit('UPDATE_SERVERS', server);
    } catch (error) {
      throw error;
    }
  },
  joinedServer({ commit, dispatch }, serverData) {
    serverData.namespace = Vue.$addServer(serverData.serverName);
    (serverData.activeChannel = 'main'),
      dispatch('initEventLiteners', serverData);
  },
  handleLogin({ commit, dispatch }, servers) {
    Object.keys(servers).forEach(server => {
      servers[server].namespace = Vue.$addServer(server);
      servers[server].activeChannel = 'main';
      dispatch('initEventLiteners', servers[server]);
    });
  },
  initEventLiteners({ commit, dispatch }, server) {
    server.namespace.emit(
      'init',
      server.channels.map(channel => channel.channelName)
    );

    server.namespace.on('messageRecived', data => {
      commit('MESSAGE_RECIVED', { serverName: server.serverName, channelName: data.channel, message: data.message });
    });

    server.namespace.on('fetchedMessages', data => {
      commit('MESSAGE_RECIVED', { serverName: server.serverName, channelName: data.channel, message: data.message });
    });
    commit('UPDATE_SERVERS', server);
  },
  messageRecived({ commit, getters }, payload) {
    const channel = getters.activeChannel(payload.serverName);
    commit('MESSAGE_RECIVED', { channelName: channel.channelName, message: payload.message });
  },
  fetchedMessages({ commit, getters }, payload) {
    const channel = getters.activeChannel(payload.serverName);
    commit('APPEND_MESSAGES', { channel, messages: payload.messages });
  },
  disconnectSockets({ commit, getters }) {
    Vue.$destroySockets(getters.servers);
    commit('CLEAR_SERVERS');
  }
};

export default actions