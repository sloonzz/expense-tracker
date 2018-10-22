<template>
  <div>
    <Navbar class="mb-4"></Navbar>
    <div class="container">
      <div class="alert alert-success" v-for="(messageObject, uIndex) in this.$store.state.messages" :key="uIndex" >
        <div class="" v-for="(message, index) in messageObject" :key="index">
          {{ message }}
        </div>
      </div>

      <div class="alert alert-danger" v-for="(errorMessage, uIndex) in this.$store.state.errors" :key="uIndex" >
        <div class="" v-for="(error, index) in errorMessage" :key="index">
          {{ error }}
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../components/general/Navbar.vue";
export default {
  components: {
    Navbar
  },
  mounted: function() {
    if (this.$store.state.accessToken) {
      this.$store.dispatch("retrieveUser");
    }
  }
};
</script>
