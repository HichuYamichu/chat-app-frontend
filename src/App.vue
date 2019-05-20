<template>
  <v-app dark>
    <page-header app/>
    <v-content>
      <v-container fluid>
        <v-layout row wrap justify-space-around>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <error-dialog/>
    <v-snackbar top v-model="snackbar" :timeout="10000">
      Download desktop app
      <v-btn icon small @click="download">
        <v-icon>cloud_download</v-icon>
      </v-btn>
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import PageHeader from './components/PageHeader';
import ErrorDialog from './components/dialogs/ErrorDialog';

export default {
  components: {
    PageHeader,
    ErrorDialog
  },
  data() {
    return {
      snackbar: false
    };
  },
  async created() {
    if (!process.env.IS_ELECTRON) {
      this.snackbar = true;
    }
  },
  methods: {
    download: async function() {
      const link = document.createElement('a');
      const addr = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : 'http://localhost:3000';
      link.href = `${addr}/download/chat-app Setup 0.1.0.exe`;
      link.click();
    }
  }
};
</script>


<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {
  overflow-y: auto !important;
}

.serverBar {
  width: 5%;
  position: fixed;
  left: 0;
  display: block;
}

.serverList {
  border-radius: 25px;
  padding: 10px;
  background-color: #e5e2e2;
}
</style>
