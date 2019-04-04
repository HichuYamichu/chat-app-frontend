const getters = {
  servers: state => state.servers,
  activeServer: state => state.servers.find(server => server.isActive),
  activeChannel: (state, getters) =>
    getters.activeServer.channels.find(
      channel => channel.channelName === getters.activeServer.currentChannel
    )
};

export default getters;
