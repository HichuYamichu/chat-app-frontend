const getters = {
  servers: state => state.servers,
  serverList: state => state.serverList,
  activeServer: state => state.servers[state.activeServer],
  activeChannel: state =>
    state.servers[state.activeServer].channels.find(
      channel =>
        channel.channelName === state.servers[state.activeServer].activeChannel
    )
};

export default getters;
