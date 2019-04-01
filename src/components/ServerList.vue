<template>
  <v-list class="pa-0">
    <v-list-tile class="my-2" v-for="(server, index) in $store.getters.serverList" :key="index">
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
export default {
  methods: {
    go: function(server, index) {
      this.$store.commit('SET_ACTIVESERVER', server)
			this.$router.push({ path: `/servers/${server}`})
		}
  }
};
</script>

<style>
</style>
