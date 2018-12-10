<template>
  <div>
    <div v-if="!loading">
      <Navbar class="mb-4"></Navbar>
      <div class="container">
        <div
          class="alert alert-success"
          v-for="(messageObject, uIndex) in this.$store.state.auth.messages"
          :key="uIndex"
        >
          <div class v-for="(message, index) in messageObject" :key="index">{{ message }}</div>
        </div>

        <div
          class="alert alert-danger"
          v-for="(errorMessage, uIndex) in this.$store.state.auth.errors"
          :key="uIndex"
        >
          <div class v-for="(error, index) in errorMessage" :key="index">{{ error }}</div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <pulse-loader id="spinner" :loading="loading"></pulse-loader>
  </div>
</template>

<script>
import Navbar from "../components/general/Navbar.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    Navbar,
    PulseLoader
  },
  data() {
    return {
      loading: false
    };
  },
  mounted: function() {
    if (this.$store.state.auth.accessToken) {
      this.loading = true;
      this.$store
        .dispatch("auth/retrieveUser")
        .then(response => {
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>
<style>
#spinner {
  text-align: center;
  padding-top: 25%;
  margin: auto;
}
</style>