<template>
  <div>
    <v-btn class="error mt-4" large @click="deleteServer">
        Delete server
      </v-btn>
  </div>
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
