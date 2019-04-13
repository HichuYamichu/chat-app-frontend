import io from 'socket.io-client';

export default {
  install(Vue, options) {
    Vue.$addServer = serverName => io(`localhost:3000/${serverName}`);
    // Vue.$disconectFromServer = serverName => io.disconnect(`localhost:3000/${serverName}`)
  }
};
