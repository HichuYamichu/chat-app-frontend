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
        :input-value="channel.channelName === activeChannel.channelName"
        @click="changeActiveChannel(index)"
        v-for="(channel, index) in channels"
        :key="index"
      >{{ channel.channelName }}</v-btn>
    </v-flex>
    <v-flex xs2 v-if="activeChannel">
      <v-btn
        :disabled="channels.findIndex(channel => channel._id === activeChannel._id) === 0"
        @click="moveUp"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-btn
        :disabled="channels.findIndex(channel => channel._id === activeChannel._id) === channels.length - 1"
        @click="moveDown"
      >
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-btn
        :disabled="activeChannel.channelName === 'main'"
        @click
        outline
        color="error"
      >delete channel</v-btn>
    </v-flex>
    <v-flex xs12 mt-4>
      <v-btn class="success" large @click="save">
        <span>save</span>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      channels: [],
      channelName: '',
      activeChannel: ''
    };
  },
  computed: {
    ...mapGetters(['activeServer'])
  },
  created() {
    this.channels = this.activeServer.channels.map(channel => {
      return {
        _id: channel._id,
        channelName: channel.channelName,
        overrides: []
      };
    });
  },
  methods: {
    createChannel: function() {
      this.channels.push({
        channelName: this.channelName,
        overrides: []
      });
    },
    deleteChannel: function() {
      const { _id } = this.activeServer.channels.find(
        channel => channel.channelName === this.editedChannel
      );
      this.activeServer.namespace.emit('deleteChannel', _id);
    },
    changeActiveChannel: function(index) {
      this.activeChannel = this.channels[index];
    },
    moveUp: function() {
      const from = this.channels.findIndex(
        channel => channel._id === this.activeChannel._id
      );
      const fromVal = this.channels.find(
        channel => channel._id === this.activeChannel._id
      );
      const newVal = this.channels[from - 1];
      this.channels.splice(from, 1, newVal);
      this.channels.splice(from - 1, 1, fromVal);
    },
    moveDown: function() {
      const from = this.channels.findIndex(
        channel => channel._id === this.activeChannel._id
      );
      const fromVal = this.channels.find(
        channel => channel._id === this.activeChannel._id
      );
      const newVal = this.channels[from + 1];
      this.channels.splice(from, 1, newVal);
      this.channels.splice(from + 1, 1, fromVal);
    },
    save: function() {
      this.activeServer.namespace.emit('updateChannels', this.channels);
      this.$forceUpdate()
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
