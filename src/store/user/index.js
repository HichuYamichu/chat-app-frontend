import stare from './userState'
import mutations from './userMutations'
import actions from './userActions'
import getters from './userGetters'

const user = {
  state: stare,
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default user