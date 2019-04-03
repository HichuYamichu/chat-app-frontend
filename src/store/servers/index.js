import stare from './serverState'
import mutations from './serverMutations'
import actions from './serverActions'
import getters from './serverGetters'

const servers = {
  state: stare,
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default servers