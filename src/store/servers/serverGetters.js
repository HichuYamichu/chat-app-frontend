const getters = {
  servers: state => state.servers,
  activeServer: state => state.servers.find(server => server.isActive),
  serverUsers: (state, gettersArg) => {
    if (!gettersArg.activeServer) return null;
    return gettersArg.activeServer.users;
  },
  findActiveChannel: (state, gettersArg) => channelID => {
    if (!gettersArg.activeServer) return null;
    return gettersArg.activeServer.channels.find(channel => channel._id === channelID);
  }
};

export default getters;
