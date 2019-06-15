<template>
  <v-card height="88vh">
    <v-layout wrap>
      <v-flex xs12 class="mb-2">
        <v-toolbar card flat color="secondary mt-1">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-medium display-1">Public Servers</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex xs12>
        <v-btn flat fab large>
          <v-icon>
            cached
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(serverData, index) in serversInfo" :key="index">
            <template v-slot:header>
              <h3 class="headline">{{serverData.serverName}}</h3>
            </template>
            <v-card>
              <v-card-text class="subheading">{{serverData.description}}</v-card-text>
              <v-card-actions>
                <v-btn
                  color="base"
                  @click="joinServer(serverData._id)"
                  :disabled="canJoin(serverData._id)"
                >join</v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      serversInfo: ''
    };
  },
  computed: {
    ...mapGetters(['servers', 'user'])
  },
  async created() {
    const { data } = await this.axios.get('/api/servers/public');
    this.serversInfo = data;
  },
  methods: {
    canJoin: function(serverID) {
      if (this.servers.some(server => server._id === serverID)) {
        return this.servers
          .find(server => server._id === serverID)
          .roles[0].roleMembers.some(member => member === this.user._id);
      } else return false;
    },
    joinServer: async function(serverID) {
      this.$store.dispatch('joinServer', serverID);
    }
  }
};
</script>

<style scoped>
.publicServers {
  height: 200px !important;
  max-height: 200px !important;
}
</style>
