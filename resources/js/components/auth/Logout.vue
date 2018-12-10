<template>
  <div class="container">
    <div style="text-align:center" v-if="!loading">
      <button
        v-on:click="logout"
        v-if="this.$store.getters['auth/isLoggedIn']"
        class="btn btn-danger"
      >Logout</button>
    </div>
    <pulse-loader id="spinner" :loading="loading"></pulse-loader>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    PulseLoader
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    logout() {
      this.loading = true;
      this.$store
        .dispatch("auth/logoutUser")
        .then(response => {
          this.$router.push("/login");
          this.loading = false;
        })
        .catch(error => {
          this.$router.push("/login");
          this.loading = false;
        });
    },
    created() {
      this.$store.commit("errors", null);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store
        .dispatch("auth/retrieveUser")
        .then(response => {
          if (!vm.$store.getters["auth/isLoggedIn"]) {
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
