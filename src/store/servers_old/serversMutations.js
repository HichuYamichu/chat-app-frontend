const mutations = {
  UPDATE_SERVERS(state, server) {
    state.servers[server.serverName] = server;
    state.serverList.push(server.serverName);
  },
  SET_ACTIVESERVER(state, serverName) {
    state.activeServer = serverName
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
    console.log(payload)
    state.servers[payload.serverName].channels
      .find(channel => channel.channelName === payload.channelName)
      .messages.unshift(...payload.messages);
  }
};

export default mutations;
