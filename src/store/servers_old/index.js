import stare from './serversState'
import mutations from './serversMutations'
import actions from './serversActions'
import getters from './serversGetters'

const servers = {
  state: stare,
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default servers