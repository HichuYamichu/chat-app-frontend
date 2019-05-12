<template>
  <div id="users">
    <v-list class="pa-0 userList">
      <v-list-tile v-for="(user, index) in serverUsers" :key="index" @click.stop="setActiveUser(user)">
        <v-list-tile-avatar>
          <v-icon :color="user.active ? 'success' : 'error'">perm_identity</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.username"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-dialog v-model="dialog" max-width="290" attach="#users" hide-overlay>
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
                    @click="assignRole(activeUser._id, availableRole._id)"
                  >{{availableRole.roleName}}</v-btn>
                </v-list-tile-action>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      activeUser: {
        _id: '',
        username: '',
        avatar: ''
      }
    };
  },
  computed: {
    ...mapGetters(['activeServer', 'serverUsers']),
    userRoles: function() {
      return this.activeServer.roles.filter(
        role =>
          role.roleMembers.includes(this.activeUser._id) &&
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
  methods: {
    setActiveUser: function(user) {
      this.activeUser = user;
      this.dialog = true;
    },
    assignRole(userID, roleID) {
      this.$store.dispatch('updateUserRole', {
        userID,
        roleID,
        actionType: 'assign'
      });
    },
    removeRole: function(userID, roleID) {
      this.$store.dispatch('updateUserRole', {
        userID,
        roleID,
        actionType: 'remove'
      });
    },
    test: function() {
      this.users.push({ username: 'dsad', active: true });
      console.log(this.users);
    }
  }
};
</script>

<style scoped>
.userList {
  max-height: 90%;
  overflow: hidden;
}
.test {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
