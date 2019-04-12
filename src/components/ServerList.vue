<template>
  <v-list class="pa-0">
    <v-list-tile class="my-2" v-for="(server, index) in servers" :key="index">
      <v-list-tile-action>
        <v-btn class="my-3" fab icon bloc small @click="go(server)">
          <v-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-avatar>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'servers'
    ])
  },
  methods: {
    go: function(server, index) {
			this.$router.push({ path: `/servers/${server.serverName}`})
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
