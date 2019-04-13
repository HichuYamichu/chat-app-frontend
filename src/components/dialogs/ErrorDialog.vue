<template>
  <div class="text-xs-center">
    <v-dialog v-model="error.show" width="500">
      <v-card>
        <v-card-title class="headline error lighten-2" primary-title>Error</v-card-title>
        <v-card-text class="title" >{{ error.message }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="dismiss">I'm sorry</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    dismiss: function() {
      this.$store.commit('DISMISS')
    }
  }
};
</script>

<style>
</style>
