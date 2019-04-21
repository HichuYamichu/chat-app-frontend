<template>
  <v-list class="pa-0 userList">
    <v-subheader>Active</v-subheader>

    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x offset-y>
      <template v-slot:activator="{ on }">
        <v-list-tile
          v-on="on"
          @click="setActiveUser(user)"
          class
          v-for="user in serverUsers"
          :key="user.username"
        >
          <v-list-tile-avatar>
            <v-icon :color="user.active ? 'success' : 'error'">perm_identity</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="user.username"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{activeUser.username}}</v-list-tile-title>
              <v-list-tile-sub-title>eyy</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn>
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-chip outline color v-for="(role, index) in userRoles" :key="index">{{role.roleName}}</v-chip>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon small flat outline v-on="on">
              <v-icon small>add</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(availableRole, index2) in availableRoles" :key="`#${index2}`">
              <v-list-tile-title>
                <v-list-tile-action>
                  <v-btn flat block @click="assignRole(activeUser.username, availableRole.roleName)">{{availableRole.roleName}}</v-btn>
                </v-list-tile-action>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card>
    </v-menu>

  
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      menu: false,
      activeUser: {
        username: '',
        avatar: ''
      }
    };
  },
  computed: {
    ...mapGetters(['activeServer', 'serverUsers']),
    userRoles: function() {
      return this.activeServer.roles.filter(role =>
        role.roleMembers.includes(this.activeUser.username) && role.roleName !== 'everyone'
      );
    },
    availableRoles: function() {
      return this.activeServer.roles.filter(
        role => !this.userRoles.includes(role.roleName)
      );
    }
  },
  methods: {
    setActiveUser: function(user) {
      this.activeUser = user;
    },
    assignRole(user, role) {
      this.$store.dispatch('assignRole', {user, role})
      console.log(user, role)
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
