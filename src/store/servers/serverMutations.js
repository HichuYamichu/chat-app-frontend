const mutations = {
  ADD_SERVER(state, server) {
    state.servers.push(server);
  },
  CHANGE_ACTIVECHANNEL(state, payload) {
    state.servers.find(server => server.serverName === payload.serverName).currentChannel = payload.channelName;
  },
  ADD_MESSAGE(state, message) {
    state.servers
      .find(server => server.serverName === message.serverName)
      .channels.find(channel => channel.channelName === message.channelName)
      .messages.push(message.data);
  },
  UPDATE_ACTIVE_USERS(state, payload) {
    state.servers.find(server => server.serverName === payload.serverName).activeUsers = payload.userList;
  }
};

export default mutations;
