<template>
  <v-layout row wrap class="mt-5">
    <v-flex xs2 offset-xs4 my-2 mr-2>
      <v-text-field
        label="new role"
        outline
        append-icon="add"
        @click:append="createRole"
        v-model="roleName"
      ></v-text-field>
      <draggable v-model="roles" class="roleList">
        <v-btn
          block
          flat
          large
          outline
          :input-value="role.roleName === activeRole.roleName"
          @click="changeActiveRole(index + 1)"
          v-for="(role, index) in roles"
          :key="index"
        >{{role.roleName}}</v-btn>
      </draggable>
      <v-btn
        block
        flat
        large
        outline
        :input-value="activeRole.roleName === activeServer.roles[0].roleName"
        @click="changeActiveRole(0)"
      >{{activeServer.roles[0].roleName}}</v-btn>
    </v-flex>
    <v-flex xs2>
      <v-chip
        class="test pa-3"
        text-color="white"
        v-for="permission in permissionList"
        :key="permission.permName"
      >
        <h3 class="title">{{ permission.permName }}</h3>
        <v-switch class="switch" v-model="activeRole.permissionSets[0].permissions[permission.permValue]"></v-switch>
      </v-chip>
    </v-flex>
    <v-flex xs12 mt-4>
      <v-btn class="success" large @click="save">save</v-btn>
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
      activeRoleIndex: 0,
      permissionList: [
        { permName: 'administrator', permValue: 'admin' },
        { permName: 'send messages', permValue: 'sendMessages' },
        { permName: 'delete messages', permValue: 'deleteMessages' },
        { permName: 'kick members', permValue: 'kickMembers' },
        { permName: 'ban members', permValue: 'banMembers' }
      ]
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
          serverID: this.activeServer._id
        });
      }
    },
    activeRole: {
      get() {
        return this.activeServer.roles[this.activeRoleIndex];
      },
      set(index) {
        this.activeRoleIndex = index;
      }
    }
  },
  methods: {
    createRole: function() {
      const newRole = {
        roleName: this.roleName,
        permissionSets: [{ _id: null, permissions: {} }],
        roleMembers: [],
      };
      this.$store.commit('ADD_NEW_ROLE', {
        newRole,
        serverID: this.activeServer._id
      });
    },
    changeActiveRole: function(index) {
      this.activeRoleIndex = index;
    },
    save: function() {
      this.$store.dispatch('saveRoles');
    }
  }
};
</script>

<style scoped>
.channelSelect {
  width: 30%;
  margin: auto;
}

.switch {
  /* margin: 20px 0px 0px 35% */
  position: absolute;
  right: 10px;
  margin: 10px 0 0 0;
}

.test {
  position: relative;
  width: 300px;
}

.test * {
  display: inline-block;
}

.roleList {
  display: flex;
  flex-direction: column-reverse;
}
</style>
