<template>
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
            <h1>You are logged in {{ this.getUser.name }}</h1>
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
        })
        .catch(error => {});
    }
  },
  computed: {
    getUser: function() {
      return this.$store.state.user;
    }
  },
  created() {
      this.$store.commit('errors', null);
  }
};
</script>
