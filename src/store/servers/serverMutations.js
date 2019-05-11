import router from '@/router';

const mutations = {
  ADD_SERVER(state, server) {
    state.servers.push(server);
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
    ).users.length = 0;
    state.servers
      .find(server => server.serverName === payload.serverName)
      .users.push(...payload.userList);
  },
  ASSIGN_ROLE_TO_USER(state, payload) {
    state.servers
      .find(server => server.serverName === payload.serverName)
      .roles.find(role => role.roleName === payload.role)
      .roleMembers.push(payload.user);
  },
  REMOVE_ROLE_FROM_USER(state, payload) {
    state.servers
      .find(server => server.serverName === payload.serverName)
      .roles.find(
        role => role.roleName === payload.role
      ).roleMembers = state.servers
        .find(server => server.serverName === payload.serverName)
        .roles.find(role => role.roleName === payload.role)
        .roleMembers.filter(member => member !== payload.user);
  },
  NEW_USER_JOINED(state, payload) {
    state.servers
      .find(server => server.serverName === payload.serverName)
      .users.push(payload.user);
    state.servers
      .find(server => server.serverName === payload.serverName)
      .roles[0].roleMembers.push(payload.user.username);
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
    console.log(payload);
    const serverToAlter = state.servers.find(
      server => server._id === payload.serverID
    );
    serverToAlter.channels = serverToAlter.channels.filter(
      channel => channel._id !== payload.channelID
    );
  },
  CHANGE_ROLE_ORDER(state, payload) {
    state.servers.find(
      server => server.serverName === payload.serverName
    ).roles.length = 1;
    state.servers
      .find(server => server.serverName === payload.serverName)
      .roles.push(...payload.newOrder);
  },
  ADD_NEW_ROLE(state, payload) {
    state.servers
      .find(server => server.serverName === payload.serverName)
      .roles.push(payload.newRole);
  },
  UPDATE_ROLES(state, payload) {
    state.servers.find(
      server => server.serverName === payload.serverName
    ).roles.length = 0;
    state.servers
      .find(server => server.serverName === payload.serverName)
      .roles.push(...payload.roles);
  }
};

export default mutations;
