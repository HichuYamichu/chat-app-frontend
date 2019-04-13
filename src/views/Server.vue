<template>
  <v-card class="pb-1" flat elevation-0>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 class="mb-2">
        <v-toolbar card flat color="tertiary">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-medium display-1">{{ activeServer.serverName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small flat fab @click="editor = true" v-if="canEdit">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn light flat fab color="error" @click="leave = true" v-else>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
      <v-flex xs3 sm2 md2 lg1>
        <channel-list/>
      </v-flex>
      <v-flex xs7 sm8 md9 lg10>
        <chat/>
      </v-flex>
      <v-flex xs2 sm2 md1 lg1>
        <user-list/>
      </v-flex>
    </v-layout>
    <editor v-model="editor" :value="editor"/>
    <leave-message v-model="leave" :value="leave"/>
  </v-card>
</template>

<script>
import Chat from '../components/Chat';
import ChannelList from '../components/ChannelList';
import UserList from '../components/UserList';
import Editor from '../components/dialogs/Editor';
import LeaveMessage from '../components/dialogs/LeaveMessage';
import { mapGetters } from 'vuex';

export default {
  components: {
    Chat,
    ChannelList,
    Editor,
    UserList,
    LeaveMessage
  },
  data() {
    return {
      editor: false,
      leave: false
    };
  },
  computed: {
    ...mapGetters(['activeServer', 'servers', 'user']),
    canEdit: function() {
      return this.activeServer.owner === this.user.username;
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

<style scoped>
</style>
