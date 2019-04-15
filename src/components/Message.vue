<template>
  <div>
    <v-list-tile class="pa-1">
      <v-list-tile-content>
        <v-list-tile-sub-title v-html=" message.author"></v-list-tile-sub-title>
        <v-list-tile-title v-html="message.content"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn small fab flat dark icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>DELETE</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>EDIT</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      menu: false
    };
  },
  methods: {
    expand: function() {
      this.menu = !this.menu;
    }
  }
};
</script>

<style>
</style>
