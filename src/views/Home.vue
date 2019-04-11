<template>
  <v-card class="main">
    <v-layout wrap>
      <v-flex xs12 class="mb-2">
        <v-toolbar card flat color="secondary">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-medium display-1">Public Servers</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex xs12>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(server, index) in servers" :key="index">
            <template v-slot:header>
              <h3>{{server.serverName}}</h3>
            </template>
            <v-card>
              <v-card-text>{{server.description}}</v-card-text>
              <v-card-actions>
                <v-btn color="base" @click="joinServer(server.serverName)">join</v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      servers: ""
    };
  },
  async created() {
    const { data } = await this.axios.get(
      "http://localhost:3000/api/servers/public"
    );
    this.servers = data;
  },
  methods: {
    joinServer: async function(serverName) {
      const { data } = await this.axios.get(`http://localhost:3000/api/servers/join?serverName=${serverName}`);
      this.$store.dispatch('joinedServer', data);
    }
  }
};
</script>

<style scoped>
.main {
  height: 88vh;
}
</style>
