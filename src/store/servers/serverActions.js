import router from '@/router';
import io from 'socket.io-client';

const actions = {
  loadServer({ commit }, server) {
    server.namespace = io(`http://localhost:3000/${server.serverName}`);
    server.currentChannel = 'main';
    server.isActive = false;
    if (server.icon) {
      server.icon = `http://localhost:3000/static/${server.serverName}.jpg`;
    } else {
      server.icon = '/img/serverIcon.png';
    }
    server.namespace.emit(
      'init',
      server.channels.map(channel => channel.channelName)
    );

    server.namespace.on('messageRecived', data => {
      commit('ADD_MESSAGE', {
        serverName: server.serverName,
        channelName: data.channel,
        data: data.message
      });
    });

    server.namespace.on('updateMessages', data => {
      data.serverName = server.serverName;
      commit('APPEND_MESSAGES', data);
    });

    server.namespace.on('updateActiveUsers', data => {
      commit('UPDATE_ACTIVE_USERS', {
        userList: data,
        serverName: server.serverName
      });
    });

    server.namespace.on('serverDelete', data => {
      server.namespace.removeAllListeners();
      if (server.isActive) router.push('/');
      commit('LEAVE_SERVER', data);
    });

    server.namespace.on('addChannel', data => {
      commit('ADD_CHANNEL', { channel: data, serverName: server.serverName });
    });

    server.namespace.on('channelDeleted', data => {
      commit('REMOVE_CHANNEL', {
        serverName: server.serverName,
        channelName: data
      });
    });

    server.namespace.on('userJoined', data => {
      commit('NEW_USER_JOINED', { serverName: server.serverName, user: data });
    });

    server.namespace.on('errorOccured', error => {
      commit('DISPLAY_ERROR', error);
    });

    server.namespace.on('updateRoles', roles => {
      commit('UPDATE_ROLES', { serverName: server.serverName, roles });
    });

    server.namespace.on('updateUserRole', data => {
      if (data.actionType === 'assign') {
        commit('ASSIGN_ROLE_TO_USER', {
          serverName: server.serverName,
          user: data.user,
          role: data.role
        });
      } else if (data.actionType === 'remove') {
        commit('REMOVE_ROLE_FROM_USER', {
          serverName: server.serverName,
          user: data.user,
          role: data.role
        });
      }
    });

    commit('ADD_SERVER', server);
  },

  leaveServer({ commit, getters }, serverName) {
    router.push('/');
    getters.servers
      .find(server => server.serverName === serverName)
      .namespace.emit('leaveServer');
    commit('LEAVE_SERVER', serverName);
  },

  deleteServer({ commit, getters }, serverName) {
    router.push('/');
    getters.servers
      .find(server => server.serverName === serverName)
      .namespace.emit('deleteServer');
  },

  handleLoguot({ commit, getters, dispatch }) {
    getters.servers.forEach(server => {
      server.namespace.emit('logout');
    });
    getters.servers.forEach(server => {
      server.namespace.removeAllListeners();
    });
    dispatch('disconnectMain', null, { root: true });
    commit('CLEAR_STATE');
  },

  saveRoles({ getters }) {
    getters.activeServer.namespace.emit(
      'updateRoles',
      getters.activeServer.roles
    );
  },

  updateUserRole({ getters }, data) {
    getters.activeServer.namespace.emit('updateUserRole', data);
  }
};

export default actions;
