<template>
    <v-list>
      <v-list-tile v-for="(channel, index) in activeServer.channels" :key="index">
        <v-btn
          :input-value="activeChannel.channelName !== channel.channelName ? '' : 'active'"
          color="primary"
          block
          flat
          @click="changeChannel(channel._id)"
        >{{ channel.channelName }}</v-btn>
      </v-list-tile>
    </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['activeServer', 'findActiveChannel']),
    activeChannel: function() {
      return this.findActiveChannel(this.$route.params.channelID)
    }
  },
  methods: {
    changeChannel: function(channelID) {
      this.$router.push(`/servers/${this.$route.params.serverID}/${channelID}`)
    }
  }
};
</script>

<style scoped>
.chnannelList {
  min-height: 500px;
}
</style>
