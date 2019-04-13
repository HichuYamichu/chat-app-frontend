<template>
    <v-list>
      <v-list-tile v-for="(channel, index) in activeServer.channels" :key="index">
        <v-btn
          :input-value="activeChannel.channelName !== channel.channelName ? '' : 'active'"
          color="primary"
          block
          flat
          @click="changeChannel(channel.channelName)"
        >{{ channel.channelName }}</v-btn>
      </v-list-tile>
    </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['activeServer', 'activeChannel'])
  },
  methods: {
    changeChannel: function(channelName) {
      this.$store.commit('CHANGE_ACTIVECHANNEL', {
        channelName: channelName,
        serverName: this.activeServer.serverName
      });
    }
  }
};
</script>

<style scoped>
.chnannelList {
  min-height: 500px;
}
</style>
