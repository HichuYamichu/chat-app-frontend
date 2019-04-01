const mutations = {
  UPDATE_SERVERS(state, server) {
    state.servers[server.serverName] = server;
    state.serverList.push(server.serverName);
  },
  CLEAR_SERVERS(state) {
    state.servers = {};
  },
  CHANGE_ACTIVECHANNEL(state, payload) {
    state.servers[payload.serverName].activeChannel = payload.channelName;
  },
  MESSAGE_RECIVED(state, payload) {
    state.servers[payload.serverName].channels
      .find(channel => channel.channelName === payload.channelName)
      .messages.push(payload.message);
  },
  APPEND_MESSAGES(state, payload) {
    payload.channel.messages.unshift(...payload.messages);
  }
};

export default mutations;
