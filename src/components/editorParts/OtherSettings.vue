<template>
  <v-layout row wrap>
    <v-flex xs2 offset-xs5>
      <v-btn class="error" block large @click="deleteServer">
        Delete server
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["activeServer"]),
  },
  methods: {
    deleteServer: function() {
      this.$store.dispatch('deleteServer', this.activeServer.serverName)
    }
  }
}
</script>

<style>

</style>
