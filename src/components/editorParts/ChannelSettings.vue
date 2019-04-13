<template>
  <div>
    <v-layout row wrap justify-space-around align-center>
      <v-flex xs12 mt-4></v-flex>
      <v-flex xs2>
        <v-overflow-btn :items="channels" label="Channels" v-model="editedChannel" depressed block></v-overflow-btn>
      </v-flex>
      <v-flex xs1>
        <v-btn block large>Restrict access</v-btn>
      </v-flex>
      <v-flex xs1>
        <v-btn class="error" block large @click="deleteChannel">Delete</v-btn>
      </v-flex>
      <v-flex xs1>
        <v-btn class="success" block large @click="openNewChannelForm">Create new</v-btn>
      </v-flex>
    </v-layout>
    <new-channel-form v-model="NewChannelForm" />
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
      editedChannel: 'choose channel',
      NewChannelForm: false
    };
  },
  computed: {
    ...mapGetters(['activeServer']),
    channels: function() {
      return this.activeServer.channels.map(channel => channel.channelName);
    }
  },
  methods: {
    openNewChannelForm: function() {
      this.NewChannelForm = true
    },
    deleteChannel() {
      this.activeServer.namespace.emit('deleteChannel', this.editedChannel)
    }
  }
};
</script>

<style>
</style>
