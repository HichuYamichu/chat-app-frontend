import stare from './errorState';
import mutations from './errorMutations';
import getters from './errorGetters';

const error = {
  state: stare,
  mutations: mutations,
  getters: getters
};

export default error;
