<template>
  <v-dialog fullscreen v-model="show">
    <v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar card flat color="primary" light>
            <v-spacer></v-spacer>
            <v-toolbar-title
              class="font-weight-medium display-1"
            >Editing: {{ activeServer.serverName }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small flat fab class="error" @click="show = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
        <v-flex>
          <v-tabs v-model="active" color="tertiary" slider-color="base" centered>
            <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>
            <v-tab-item v-for="n in 3" :key="n">
              <v-card flat>
                <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iste eveniet repudiandae voluptatibus molestiae soluta architecto! Dolores quisquam minima nihil repudiandae inventore, excepturi sed aliquid veritatis rerum beatae ipsum esse?</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["value"],
  data() {
    return {
      active: null,
    }
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