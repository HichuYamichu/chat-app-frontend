<template>
  <nav>
    <v-toolbar flat app dark class="base ml-0" clipped-left>
      <v-avatar size="54" @click="go">
        <img src="../assets/fav.png">
      </v-avatar>
      <v-toolbar-title>Chat-app</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!$store.getters.user" block flat to="/login">login</v-btn>
        <v-btn v-if="!$store.getters.user" block flat to="/register">register</v-btn>
        <v-btn v-if="$store.getters.user" block flat to="/user">User</v-btn>
        <v-btn v-if="$store.getters.user" block flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      app
      v-model="drawer"
      mini-variant
      permanent
      clipped
      class="secondary"
      v-if="user"
    >
      <server-list class="serverList"/>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import ServerList from "./ServerList";
import { mapGetters } from "vuex";
export default {
  components: {
    ServerList
  },
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    },
    go: function(server, index) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.serverList {
  max-height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.serverList::-webkit-scrollbar {
  /* WebKit */
  width: 0;
  height: 0;
}
</style>
