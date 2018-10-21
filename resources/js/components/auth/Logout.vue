<template>
  <div class="container">
    <button v-on:click="logout" v-if="this.$store.getters.isLoggedIn" class="btn btn-danger">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch("logoutUser")
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
</style>
