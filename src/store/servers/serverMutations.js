const mutations = {
  ADD_SERVER(state, server) {
    state.servers.push(server);
  },
  SET_CURRENT_SERVER_NAME(state, serverName) {
    state.currentServerName = serverName;
  },
  CHANGE_ACTIVECHANNEL(state, payload) {
    state.servers.find(server => server.serverName === payload.serverName).currentChannel = payload.channelName;
  },
  ADD_MESSAGE(state, message) {
    state.servers
      .find(server => server.serverName === message.serverName)
      .channels.find(channel => channel.channelName === message.channelName)
      .messages.push(message.data);
  }
};

export default mutations;
