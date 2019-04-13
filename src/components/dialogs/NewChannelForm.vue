<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="title lighten-2" primary-title>Create new channel</v-card-title>
        <v-text-field label="channel name" outline v-model="channelName" ></v-text-field>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" block flat @click="createChannel">Create</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      channelName: ''
    }
  },
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
    createChannel: function() {
      this.activeServer.namespace.emit('createChannel', this.channelName);
      this.show = false;
    }
  }
};
</script>

<style>
</style>
