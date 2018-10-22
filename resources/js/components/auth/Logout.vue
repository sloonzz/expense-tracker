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
    },
    created() {
      this.$store.commit("errors", null);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store
        .dispatch("retrieveUser")
        .then(response => {
          if (!vm.$store.getters.isLoggedIn) {
            next("/");
          } else {
            next();
          }
        })
        .catch(error => {
          next("/");
        });
    });
  }
};
</script>

<style>
</style>
