<template>
  <v-list class="pa-0">
    <v-list-tile class="my-2" v-for="(server, index) in servers" :key="index">
      <v-list-tile-action>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn class="my-3" fab icon bloc small @click="go(server)" v-on="on">
              <v-avatar>
                <img
                  :src="server.icon"
                >
              </v-avatar>
            </v-btn>
          </template>
          <span>{{ server.serverName }}</span>
        </v-tooltip>
      </v-list-tile-action>
    </v-list-tile>
    <v-list-tile class="">
      <v-list-tile-action>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn class="my-3" fab icon bloc small @click="goToNewServerForm" v-on="on">
              <v-avatar>
                <v-icon>
                  add
                </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <span>add server</span>
        </v-tooltip>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['servers', 'activeServer'])
  },
  methods: {
    go: function(server, index) {
      this.$router.push({ path: `/servers/${server._id}/${server.channels[0]._id}` });
    },
    goToNewServerForm: function() {
      this.$router.push('/new')
    }
  }
};
</script>

<style scoped>
.serverList {
  max-height: 200px;
  overflow: auto;
}
</style>
