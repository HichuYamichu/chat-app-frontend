<template>
  <v-card class="pb-1">
    <v-layout row wrap justify-space-between>
      <v-flex xs12 class="mb-2">
        <v-toolbar card flat color="tertiary">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-medium display-1">{{ activeServer.serverName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small flat fab @click="edit">
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
      <v-flex xs3 sm2 md2 lg1>
        <channel-list/>
      </v-flex>
      <v-flex xs7 sm9 md10 lg11>
        <chat/>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Chat from "../components/Chat";
import ChannelList from "../components/ChannelList";
import { mapGetters } from 'vuex'

export default {
  components: {
    Chat,
    ChannelList
  },
  data() {
    return {
      serverName: this.$route.params.serverName
    };
  },
  computed: {
    ...mapGetters([
      'activeServer'
    ])
  },
  methods: {
    edit: function() {
      this.$router.push(`/edit/${activeServer.serverName}`)
    }
  }
};
</script>

<style>
</style>
