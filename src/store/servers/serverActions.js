import Vue from 'vue'
import axios from 'axios';

const actions = {
  joinServer({ commit }, server) {
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

  createServer() {

  }
}

export default actions