<template>
  <v-list class="pa-0 userList">
    <v-subheader>Active</v-subheader>

    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on }">
        <v-list-tile
          v-on="on"
          @click="setActiveUser(user)"
          class
          v-for="(user, index) in serverUsers"
          :key="index"
        >
          <v-list-tile-avatar>
            <v-icon :color="user.active ? 'success' : 'error'">perm_identity</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="user.username"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-card max-width="500px">
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
              <v-btn fab small flat>
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-chip outline color v-for="(role, index2) in userRoles" :key="`#${index2}`">
          <v-avatar @click="removeRole(activeUser.username, role.roleName)">
            <v-icon small>close</v-icon>
          </v-avatar>
          {{role.roleName}}
        </v-chip>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon small flat outline v-on="on">
              <v-icon small>add</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(availableRole, index3) in availableRoles" :key="`##${index3}`">
              <v-list-tile-title>
                <v-list-tile-action>
                  <v-btn
                    flat
                    block
                    @click="assignRole(activeUser.username, availableRole.roleName)"
                  >{{availableRole.roleName}}</v-btn>
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
    users: function() {
      return this.activeServer.users
    },
    userRoles: function() {
      return this.activeServer.roles.filter(
        role =>
          role.roleMembers.includes(this.activeUser.username) &&
          role.roleName !== 'everyone'
      );
    },
    availableRoles: function() {
      return this.activeServer.roles.filter(
        role =>
          !this.userRoles.map(role => role.roleName).includes(role.roleName) &&
          role.roleName !== 'everyone'
      );
    }
  },
  watch: {
    serverUsers: function() {
      this.$forceUpdate();
    }
  },
  methods: {
    setActiveUser: function(user) {
      this.activeUser = user;
    },
    assignRole(user, role) {
      this.$store.dispatch('updateUserRole', { user, role, actionType: 'assign' });
    },
    removeRole: function(user, role) {
      this.$store.dispatch('updateUserRole', { user, role, actionType: 'remove' });
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
