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
  </v-app>
</template>

<script>
import PageHeader from "./components/PageHeader";
import ErrorDialog from "./components/dialogs/ErrorDialog";

export default {
  components: {
    PageHeader,
    ErrorDialog
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
  background-color: #E5E2E2;
}
</style>
