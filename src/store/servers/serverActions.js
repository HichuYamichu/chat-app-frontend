import Vue from 'vue'
import axios from 'axios';

const actions = {
  joinServer({ commit }, server) {
    console.log(server)
    server.namespace = Vue.$addServer(server.serverName);
    server.currentChannel = 'main'
    server.isActive = false
    server.namespace.emit(
      'init',
      server.channels.map(channel => channel.channelName)
    );

    server.namespace.on('messageRecived', data => {
      commit('ADD_MESSAGE', { serverName: server.serverName, channelName: data.channel, data: data.message });
    });

    commit('ADD_SERVER', server);
  },

  async createServer({ dispatch, rootState }, serverName) {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/servers/new-server',
        {
          serverName: serverName,
          owner: rootState.user.user.username
        }
      );
      dispatch('joinServer', data)
    } catch (error) {
      throw error;
    }
  }
}

export default actions