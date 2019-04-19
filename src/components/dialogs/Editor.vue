<template>
  <v-dialog fullscreen v-model="show">
    <v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar card flat color="base" class="pb-2">
            <v-spacer></v-spacer>
            <v-toolbar-title
              class="font-weight-medium display-1"
            >{{ activeServer.serverName }} settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn absolute right small flat fab class="error" @click="show = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
        <v-flex>
          <v-tabs v-model="active" color="tertiary" slider-color="base" centered>
            <v-tab ripple>Channels</v-tab>
            <v-tab ripple>Roles</v-tab>
            <v-tab ripple>Other</v-tab>
            <v-tab-item>
              <channel-settings/>
            </v-tab-item>
            <v-tab-item>
              <role-settings/>
            </v-tab-item>
            <v-tab-item>
              <other-settings/>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import OtherSettings from "../editorParts/OtherSettings";
import ChannelSettings from "../editorParts/ChannelSettings";
import RoleSettings from "../editorParts/RoleSettings";
import { mapGetters } from "vuex";

export default {
  components: {
    OtherSettings,
    ChannelSettings,
    RoleSettings
  },
  props: ["value"],
  data() {
    return {
      active: null
    };
  },
  computed: {
    ...mapGetters(["activeServer"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>