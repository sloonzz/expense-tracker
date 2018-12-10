<template>
  <div class="container">
    <template v-if="!loading">
      <form v-if="!this.$store.getters['auth/isLoggedIn']">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            v-model="email"
            class="form-control"
            placeholder="username"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            class="form-control"
            placeholder="password"
          >
        </div>
        <button @click.prevent v-on:click="login" class="btn btn-primary">Submit</button>
      </form>
      <div v-else>
        <h1>You are already logged in, {{ this.getUser.name }}</h1>
      </div>
    </template>

    <pulse-loader id="spinner" :loading="loading"></pulse-loader>
  </div>
</template>

<script>
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    PulseLoader
  },
  data: function() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("auth/loginUser", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push("/");
          this.$store.dispatch("auth/retrieveUser");
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  },
  computed: {
    getUser: function() {
      return this.$store.state.auth.user;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store
        .dispatch("auth/retrieveUser")
        .then(response => {
          if (vm.$store.getters["auth/isLoggedIn"]) {
            next("/");
          } else {
            next();
          }
        })
        .catch(error => {
          next();
        });
    });
  },
  created() {
    this.$store.commit("auth/errors", null);
    this.$store.commit("auth/messages", null);
  }
};
</script>
