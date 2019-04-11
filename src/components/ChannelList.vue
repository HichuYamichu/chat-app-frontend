<template>
  <v-list>
    <v-list-tile-title class="text-xs-center headline mb-2">Channels</v-list-tile-title>
    <v-list-tile
      v-for="(channel, index) in activeServer.channels"
      :key="index"
    >
      <v-btn
        :input-value="activeChannel.channelName !== channel.channelName ? 'active' : ''"
        color="primary"
        block
        flat
        outline
        @click="changeChannel(channel.channelName)"
      >{{ channel.channelName }}</v-btn>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      newChannelName: ""
    };
  },
  computed: {
    ...mapGetters([
      'activeServer',
      'activeChannel'
    ])
  },
  methods: {
    changeChannel: function(channelName) {
      this.$store.commit("CHANGE_ACTIVECHANNEL", {
        channelName: channelName,
        serverName: this.activeServer.serverName
      });
    },
    createChannel: function() {
      this.$store.getters
        .activeServer
        .namespace.emit("createChannel", this.newChannelName);
      // TODO ERROR HANDLING AND DYNAMIC UPDATE
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>
