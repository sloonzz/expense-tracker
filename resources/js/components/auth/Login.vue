<template>
    <div class="container">
        <form v-if="!this.$store.getters.isLoggedIn">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" class="form-control" placeholder="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password" class="form-control" placeholder="password">
            </div>
            <button @click.prevent v-on:click="login" class="btn btn-primary">Submit</button>
        </form>
        <div v-else>
            <h1>You are already logged in, {{ this.getUser.name }}</h1>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("loginUser", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push("/");
          this.$store.dispatch("retrieveUser");
        })
        .catch(error => {});
    }
  },
  computed: {
    getUser: function() {
      return this.$store.state.user;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store
        .dispatch("retrieveUser")
        .then(response => {
          if (vm.$store.getters.isLoggedIn) {
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
    this.$store.commit("errors", null);
  }
};
</script>
