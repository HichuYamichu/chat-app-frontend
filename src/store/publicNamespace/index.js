import stare from './publicNamespaceState';
import mutations from './publicNamespaceMutations';
import actions from './publicNamespaceActions';
import getters from './publicNamespaceGetters';

const publicNamespace = {
  state: stare,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default publicNamespace;
