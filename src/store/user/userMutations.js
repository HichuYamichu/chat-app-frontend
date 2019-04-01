const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  LOGOUT(state, user) {
    state.user = null;
  }
};

export default mutations;
