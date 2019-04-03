const getters = {
  servers: state => state.servers,
  activeServer: state => state.servers.find(server => server.serverName === state.currentServerName),
  activeChannel: (state, getters) =>
    getters.activeServer.channels.find(
      channel => channel.channelName === getters.activeServer.currentChannel
    )
  // activeChannel: (state, getters) =>  getters.activeServer.channels.find(channel => channel.serverName === router.currentRoute.params.channelName),
};

export default getters;
