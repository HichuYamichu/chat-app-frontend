<template>
  <v-layout row wrap>
    <v-flex xs2 offset-xs1 my-3>
      <v-text-field
        label="new role"
        outline
        append-icon="add"
        @click:append="createRole"
        v-model="roleName"
      ></v-text-field>
      <draggable v-model="roles">
        <v-btn
          class
          block
          flat
          large
          outline
          @click="changeActiveRole(index + 1)"
          v-for="(role, index) in roles"
          :key="index"
        >{{role.roleName}}</v-btn>
      </draggable>
      <v-btn
          class
          block
          flat
          large
          outline
          @click="changeActiveRole(0)"
        >{{activeServer.roles[0].roleName}}</v-btn>
    </v-flex>
    <v-flex xs5 offset-xs1>
      {{ activeRole }}
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      roleName: '',
      activeRoleIndex: 0
    };
  },
  computed: {
    ...mapGetters(['activeServer']),
    roles: {
      get() {
        return this.activeServer.roles.filter(
          role => role.roleName !== 'everyone'
        );
      },
      set(value) {
        this.$store.commit('CHANGE_ROLE_ORDER', {
          newOrder: value,
          serverName: this.activeServer.serverName
        });
      }
    },
    activeRole: {
      get() {
        return this.activeServer.roles[this.activeRoleIndex]
      },
      set(index) {
        this.activeRoleIndex = index
      }
    }
  },
  methods: {
    createRole: function() {
      const newRole = {
        disallowedChannels: [],
        permissions: {},
        roleLevel: this.activeServer.roles.length,
        roleMembers: [],
        roleName: this.roleName
      };
      this.$store.commit('ADD_NEW_ROLE', { newRole, serverName: this.activeServer.serverName })
    },
    changeActiveRole: function(index) {
      this.activeRoleIndex = index
    }
  }
};
</script>

<style scoped>
.channelSelect {
  width: 30%;
  margin: auto;
}
</style>
