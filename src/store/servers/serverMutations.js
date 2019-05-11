import router from '@/router';

const mutations = {
  ADD_SERVER(state, server) {
    state.servers.push(server);
  },
  ADD_MESSAGE(state, message) {
    state.servers
      .find(server => server._id === message.serverID)
      .channels.find(channel => channel._id === message.channelID)
      .messages.push(message.data);
  },
  APPEND_MESSAGES(state, payload) {
    state.servers
      .find(server => server._id === payload.serverID)
      .channels.find(channel => channel._id === payload.channelID)
      .messages.unshift(...payload.messages);
  },
  UPDATE_ACTIVE_USERS(state, payload) {
    state.servers.find(
      server => server._id === payload.serverID
    ).users.length = 0;
    state.servers
      .find(server => server._id === payload.serverID)
      .users.push(...payload.userList);
  },
  ASSIGN_ROLE_TO_USER(state, payload) {
    state.servers
      .find(server => server._id === payload.serverID)
      .roles.find(role => role.roleName === payload.role)
      .roleMembers.push(payload.user);
  },
  REMOVE_ROLE_FROM_USER(state, payload) {
    state.servers
      .find(server => server._id === payload.serverID)
      .roles.find(
        role => role.roleName === payload.role
      ).roleMembers = state.servers
        .find(server => server._id === payload.serverID)
        .roles.find(role => role.roleName === payload.role)
        .roleMembers.filter(member => member !== payload.user);
  },
  NEW_USER_JOINED(state, payload) {
    state.servers
      .find(server => server._id === payload.serverID)
      .users.push(payload.user);
    state.servers
      .find(server => server._id === payload.serverID)
      .roles[0].roleMembers.push(payload.user.username);
  },
  LEAVE_SERVER(state, serverID) {
    state.servers = state.servers.filter(
      server => server._id !== serverID
    );
  },
  CLEAR_STATE(state) {
    state.servers.length = 0;
  },
  ADD_CHANNEL(state, payload) {
    state.servers
      .find(server => server._id === payload.serverID)
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
      server => server._id === payload.serverID
    ).roles.length = 1;
    state.servers
      .find(server => server._id === payload.serverID)
      .roles.push(...payload.newOrder);
  },
  ADD_NEW_ROLE(state, payload) {
    state.servers
      .find(server => server._id === payload.serverID)
      .roles.push(payload.newRole);
  },
  UPDATE_ROLES(state, payload) {
    state.servers.find(
      server => server._id === payload.serverID
    ).roles.length = 0;
    state.servers
      .find(server => server._id === payload.serverID)
      .roles.push(...payload.roles);
  }
};

export default mutations;
