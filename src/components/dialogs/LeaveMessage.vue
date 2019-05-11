<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="title lighten-2" primary-title>Leave {{ activeServer.serverName }}?</v-card-title>
        <v-card-text class="subheading">You will need new invitation link to re-enter</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" block flat @click="show = false">No</v-btn>
          <v-btn color="error" block flat @click="leave">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['value'],
  computed: {
    ...mapGetters(['activeServer']),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    leave: function() {
      this.show = false;
      this.$store.dispatch('leaveServer', this.activeServer._id);
    }
  }
};
</script>

<style>
</style>
