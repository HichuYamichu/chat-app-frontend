<template>
  <div>
    <div class="channelSelect mt-4">
      <v-select :items="channels" v-model="editedChannel" label="Choose channel" outline></v-select>
      <v-btn class="base" large flat>Restrict access</v-btn>
      <v-btn class="error" large flat @click="deleteChannel">Delete</v-btn>
      <v-btn class="success" large flat @click="openNewChannelForm">Create new</v-btn>
    </div>
    <new-channel-form v-model="NewChannelForm"/>
  </div>
</template>

<script>
import ChannelList from '../ChannelList';
import NewChannelForm from '../dialogs/NewChannelForm';
import { mapGetters } from 'vuex';

export default {
  components: {
    ChannelList,
    NewChannelForm
  },
  data() {
    return {
      editedChannel: '',
      NewChannelForm: false
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
    openNewChannelForm: function() {
      this.NewChannelForm = true;
    },
    deleteChannel() {
      this.activeServer.namespace.emit('deleteChannel', this.editedChannel);
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
