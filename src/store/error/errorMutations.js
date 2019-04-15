const mutations = {
  DISPLAY_ERROR(state, errorMessage) {
    state.error = { show: true, message: errorMessage };
  },
  DISMISS(state) {
    state.error.show = false;
  }
};

export default mutations;
