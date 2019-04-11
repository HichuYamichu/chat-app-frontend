<template>
  <nav>
    <v-toolbar flat app dark class="base" clipped-left>
      <v-avatar size="54" @click="go">
        <img src="../assets/3.png">
      </v-avatar>
      <v-toolbar-title>Chat-app</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!$store.getters.user" block flat to="/login">login</v-btn>
        <v-btn v-if="!$store.getters.user" block flat to="/register">register</v-btn>
        <v-btn v-if="$store.getters.user" block flat to="/new">Create server</v-btn>
        <v-btn v-if="$store.getters.user" block flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" mini-variant permanent clipped class="secondary">
      <server-list/>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import ServerList from "./ServerList";
export default {
  components: {
    ServerList
  },
  data() {
    return {
      drawer: true
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    go: function(server, index) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
