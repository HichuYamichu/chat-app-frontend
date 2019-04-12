<template>
  <v-card class="pb-1">
    <v-layout row wrap justify-space-between>
      <v-flex xs12 class="mb-2">
        <v-toolbar card flat color="tertiary">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-medium display-1">{{ activeServer.serverName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small flat fab @click="editor = true">
            <v-icon>edit</v-icon>
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
    <editor v-model="editor" :value="editor"/>
  </v-card>
</template>

<script>
import Chat from "../components/Chat";
import ChannelList from "../components/ChannelList";
import Editor from "../components/Editor";
import { mapGetters } from "vuex";

export default {
  components: {
    Chat,
    ChannelList,
    Editor
  },
  data() {
    return {
      editor: false
    };
  },
  computed: {
    ...mapGetters(["activeServer", "servers"])
  },
  methods: {
    edit: function() {
      this.$router.push(`/edit/${this.activeServer.serverName}`);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.serverName) {
      if (from.params.serverName) {
        this.servers.find(
          server => server.serverName === from.params.serverName
        ).isActive = false;
      }
      this.servers.find(
        server => server.serverName === to.params.serverName
      ).isActive = true;
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.servers.find(
      server => server.serverName === from.params.serverName
    ).isActive = false;
    next();
  }
};
</script>

<style>
</style>
