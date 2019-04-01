const getters = {
  servers: state => state.servers,
  serverList: state => state.serverList,
  activeServer: state => serverName => state.servers[serverName],
  activeChannel: state => serverName =>
    state.servers[serverName].channels.find(
      channel => channel.channelName === state.servers[serverName].activeChannel
    )
};

export default getters;
