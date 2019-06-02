const mutations = {
  SET_PUBLIC_NAMESPACE(state, namespace) {
    state.publicNamespace = namespace;
  },
  CLEAR(state) {
    state.publicNamespace = {};
  }
};

export default mutations;
