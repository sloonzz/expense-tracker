<template>
  <div class="container">
    <h1 v-if="this.$store.getters.loggedIn">
      Welcome, {{ this.$store.state.user.name }}
    </h1>
    <h1 v-else>
      Create an account now!
    </h1>
    <router-link to="/register" class="btn btn-primary">Register</router-link>
    <hr>
    <small>...or if you have an account already.</small>
    <router-link to="/login" class="btn btn-secondary">Login</router-link>
  </div>
</template>

<script>
export default {};
</script>
