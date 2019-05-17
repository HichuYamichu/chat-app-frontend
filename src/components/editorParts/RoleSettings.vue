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
      <draggable v-model="roles">
        <v-btn
          block
          flat
          outline
          :input-value="role.roleName === activeRole.roleName"
          @click="changeActiveRole(index)"
          v-for="(role, index) in roles"
          :key="index"
        >{{role.roleName}}</v-btn>
      </draggable>
      <v-btn
        block
        flat
        outline
        :input-value="activeRole.roleName === 'everyone'"
        @click="changeToEveryone()"
      >everyone</v-btn>
    </v-flex>
    <v-flex xs2>
      <v-chip
        class="permissionBlock pa-3"
        text-color="white"
        v-for="permission in permissionList"
        :key="permission.permName"
      >
        <h3 class="title">{{ permission.permName }}</h3>
        <v-switch
          class="switch"
          v-model="activeRole.permissionSets[0].permissions[permission.permValue]"
        ></v-switch>
      </v-chip>
      <v-btn
        :disabled="activeRole.roleName === 'everyone'"
        @click="deleteRole"
        outline
        color="error"
      >delete role</v-btn>
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
      roles: [],
      everyone: {},
      activeRole: {},
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
    ...mapGetters(['activeServer'])
  },
  created() {
    this.roles = [...this.activeServer.roles];
    this.roles.reverse();
    this.everyone = this.roles.shift();
    this.activeRole = this.everyone
  },
  methods: {
    createRole: function() {
      const newRole = {
        roleName: this.roleName,
        permissionSets: [{ permissions: {} }],
        roleMembers: []
      };
      this.roles.unshift(newRole);
    },
    changeActiveRole: function(index) {
      
      this.activeRole = this.roles[index];
    },
    changeToEveryone: function() {
      this.activeRole = this.everyone
    },
    deleteRole: function() {},
    save: function() {
      // this.$store.dispatch('saveRoles');
      this.activeServer.namespace.emit('updateRoles', [this.everyone, ...this.roles])
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
  position: absolute;
  right: 10px;
  margin: 10px 0 0 0;
}

.permissionBlock {
  position: relative;
  width: 300px;
}

.permissionBlock * {
  display: inline-block;
}
</style>
