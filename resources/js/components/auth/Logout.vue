<template>
  <div class="container">
    <div class="alert alert-danger" v-for="(errorMessage, uIndex) in this.$store.state.errors" :key="uIndex" >
      <div class="" v-for="(error, index) in errorMessage" :key="index">
        {{ error }}
      </div>
    </div>
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
    },
    created() {
      this.$store.commit('errors', null);
    }
  }
};
</script>

<style>
</style>
