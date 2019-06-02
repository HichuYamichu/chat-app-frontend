<template>
  <v-layout row wrap class="mt-5">
    <v-flex xs2 offset-xs4 my-2 mr-2>
      <v-text-field
        label="new channel"
        outline
        append-icon="add"
        @click:append="createChannel"
        v-model="channelName"
      ></v-text-field>
      <v-btn
        block
        flat
        outline
        :input-value="activeChannel.channelName === 'main'"
        @click="changeToMain()"
      >everyone</v-btn>
      <draggable v-model="channels">
        <v-btn
          block
          flat
          outline
          :input-value="channel.channelName === activeChannel.channelName"
          @click="changeActiveChannel(index)"
          v-for="(channel, index) in channels"
          :key="index"
        >{{ channel.channelName }}</v-btn>
      </draggable>
    </v-flex>
    <v-flex xs2>
      <v-btn
        :disabled="activeChannel.channelName === 'main'"
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

export default {
  data() {
    return {
      editedChannel: '',
      channelName: '',
      activeChannel: {}
    };
  },
  computed: {
    ...mapGetters(['activeServer']),
    channels: function() {
      return this.activeServer.channels
        .map(channel => channel.channelName)
        .filter(channel => channel !== 'main');
    }
  },
  methods: {
    createChannel: function() {
      this.activeServer.namespace.emit('createChannel', this.channelName);
    },
    deleteChannel: function() {
      console.log(this.editedChannel)
      const { _id } = this.activeServer.channels.find(channel => channel.channelName === this.editedChannel)
      this.activeServer.namespace.emit('deleteChannel', _id);
    },
    changeActiveChannel: function() {

    },
    changeToMain: function() {
      
    }
  }
};
</script>

<style scoped>
.channelSelect {
  width: 30%;
  margin: auto;
}
</style>
