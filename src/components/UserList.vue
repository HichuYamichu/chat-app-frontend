<template>
  <v-list class="pa-0 userList">
    <v-subheader>Active</v-subheader>
    <v-list-tile class v-for="(user, index) in activeUsers" :key="index">
      <v-list-tile-avatar>
        <v-icon color="green" >perm_identity</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="user.username"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-subheader>Offline</v-subheader>
    <v-list-tile v-for="(inactiveUser, index2) in inactiveUsers" :key="`${index2}-${inactiveUser}`">
      <v-list-tile-avatar>
        <v-icon>perm_identity</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="inactiveUser"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["activeServer"]),
    activeUsers: function() {
      return this.activeServer.activeUsers
    },
    inactiveUsers: function() {
      return this.activeServer.roles[0].roleMembers.filter(
        user =>
          !this.activeServer.activeUsers
            .map(user => user.username)
            .includes(user)
      );
    }
  }
};
</script>

<style scoped>
.userList {
  max-height: 90%;
  overflow: hidden;
}
</style>
