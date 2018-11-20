<template>
  <div class="container">
    <h1 v-if="this.$store.getters['auth/isLoggedIn']">
      Welcome, {{ this.$store.state.auth.user.name }}
    </h1>
    <div v-else>
      <h1>
        Create an account now!
      </h1>
      <router-link to="/register" class="btn btn-primary">Register</router-link>
      <hr>
      <small>...or if you have an account already.</small>
      <router-link to="/login" class="btn btn-secondary">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
