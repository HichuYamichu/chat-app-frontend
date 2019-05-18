import router from '@/router';
import io from 'socket.io-client';

const actions = {
  loadServer({ commit, getters }, server) {
    const addr = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000';
    server.namespace = io(`${addr}/${server._id}`);
    server.isActive = false;
    if (server.icon) {
      server.icon = `${addr}/static/${server._id}.jpg`;
    } else {
      server.icon = '/img/serverIcon.png';
    }

    server.namespace.on('messageRecived', data => {
      commit('ADD_MESSAGE', {
        serverID: server._id,
        channelID: data.channelID,
        data: data.message
      });
    });

    server.namespace.on('updateMessages', data => {
      data.serverID = server._id;
      commit('APPEND_MESSAGES', data);
    });

    server.namespace.on('updateActiveUsers', data => {
      commit('UPDATE_ACTIVE_USERS', {
        userList: data,
        serverID: server._id
      });
    });

    server.namespace.on('serverDelete', data => {
      server.namespace.removeAllListeners();
      if (server.isActive) router.push('/');
      commit('LEAVE_SERVER', data);
    });

    server.namespace.on('addChannel', data => {
      commit('ADD_CHANNEL', { channel: data, serverID: server._id });
    });

    server.namespace.on('channelDeleted', data => {
      console.log(router.history.current.params);
      if (router.history.current.params.channelID === data) {
        router.push(
          `/servers/${getters.activeServer._id}/${getters.activeServer.channels[0]._id}`
        );
      }
      commit('REMOVE_CHANNEL', {
        serverID: server._id,
        channelID: data
      });
    });

    server.namespace.on('errorOccured', error => {
      commit('DISPLAY_ERROR', error);
    });

    server.namespace.on('updateRoles', roles => {
      commit('UPDATE_ROLES', { serverID: server._id, roles });
    });

    server.namespace.on('updateUserRole', data => {
      if (data.actionType === 'assign') {
        commit('ASSIGN_ROLE_TO_USER', {
          serverID: server._id,
          userID: data.userID,
          roleID: data.roleID
        });
      } else if (data.actionType === 'remove') {
        commit('REMOVE_ROLE_FROM_USER', {
          serverID: server._id,
          userID: data.userID,
          roleID: data.roleID
        });
      }
    });

    commit('ADD_SERVER', server);
  },

  leaveServer({ commit, getters }, serverID) {
    router.push('/');
    getters.servers
      .find(server => server._id === serverID)
      .namespace.emit('leaveServer');
    commit('LEAVE_SERVER', serverID);
  },

  deleteServer({ commit, getters }, serverID) {
    router.push('/');
    getters.servers
      .find(server => server._id === serverID)
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

  updateUserRole({ getters }, data) {
    getters.activeServer.namespace.emit('updateUserRole', data);
  }
};

export default actions;
