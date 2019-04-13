const mutations = {
  ADD_SERVER(state, server) {
    state.servers.push(server);
  },
  CHANGE_ACTIVECHANNEL(state, payload) {
    state.servers.find(
      server => server.serverName === payload.serverName
    ).currentChannel = payload.channelName;
  },
  ADD_MESSAGE(state, message) {
    state.servers
      .find(server => server.serverName === message.serverName)
      .channels.find(channel => channel.channelName === message.channelName)
      .messages.push(message.data);
  },
  APPEND_MESSAGES(state, payload) {
    state.servers
      .find(server => server.serverName === payload.serverName)
      .channels.find(channel => channel.channelName === payload.channelName)
      .messages.unshift(...payload.messages);
  },
  UPDATE_ACTIVE_USERS(state, payload) {
    state.servers.find(
      server => server.serverName === payload.serverName
    ).activeUsers = payload.userList;
  },
  LEAVE_SERVER(state, serverName) {
    state.servers = state.servers.filter(
      server => server.serverName !== serverName
    );
  },
  CLEAR_STATE(state) {
    state.servers.length = 0;
  },
  ADD_CHANNEL(state, payload) {
    state.servers
      .find(server => server.serverName === payload.serverName)
      .channels.push(payload.channel);
  },
  REMOVE_CHANNEL(state, payload) {
    state.servers.find(
      server => server.serverName === payload.serverName
    ).channels = state.servers
      .find(server => server.serverName === payload.serverName)
      .channels.filter(channel => channel.channelName !== payload.channelName);
  },
  DISPLAY_ERROR(state, errorMessage) {
    state.error = { show: true, message: errorMessage };
  },
  DISMISS(state) {
    state.error.show = false;
  }
};

export default mutations;
