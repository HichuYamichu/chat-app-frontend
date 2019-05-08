<template>
  <v-card>
    <v-form>
      <v-layout row wrap justify-space-around align-content-center>
        <v-flex xs12>
          <h1 class="display-2 py-2 my-1">Create new server</h1>
          <v-switch class="switch" v-model="isPrivate" label="private"></v-switch>
        </v-flex>
        <v-flex xs12 mb-3>
          <div class="upload-btn-wrapper">
            <v-btn large outline tag="label" for="file" class="btn">{{ fileName }}</v-btn>
            <input
              type="file"
              ref="icon"
              accept=".jpg"
              id="file"
              class="fileInput"
              data-max-size="2024"
              @change="changeName"
            >
          </div>
        </v-flex>
        <v-flex xs6 class="mt-1">
          <v-text-field outline type="text" label="server name" v-model="serverName"></v-text-field>
        </v-flex>
        <v-flex xs7>
          <v-textarea outline label="Description" v-model="description"></v-textarea>
        </v-flex>
        <v-flex xs6 offset-xs-6>
          <v-btn class="base mb-2" @click="create">create</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fileName: 'upload icon',
      file: null,
      serverName: '',
      description: '',
      isPrivate: false
    };
  },
  methods: {
    create: async function() {
      await this.$store.dispatch('createServer', {
        serverName: this.serverName,
        description: this.description,
        private: this.isPrivate,
        icon: this.$refs['icon'].files[0]
      });
    },
    changeName: function() {
      if (this.$refs['icon'].files[0]) {
        this.fileName = this.$refs['icon'].files[0].name;
      } else this.fileName = 'upload icon';
    }
  }
};
</script>

<style scoped>
.switch {
  display: inline-block;
}
.upload-btn-wrapper {
  width: 100%;
  margin: auto;
  display: block;
  text-align: center;
}
.btn {
  margin: auto;
}
input[type='file'] {
  display: none;
}
</style>
