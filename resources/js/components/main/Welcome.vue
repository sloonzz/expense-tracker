<template>
  <div class="container">
    <div v-if="this.$store.getters['auth/isLoggedIn']">
      <h1>Welcome, {{ this.$store.state.auth.user.name }}.</h1>
      <hr>
      <p>You can get started recording your expenses
        <router-link :to="{name:'expenses'}">here.</router-link>
      </p>
    </div>
    <div v-else>
      <h1>Create an account now!</h1>
      <router-link :to="{name: 'register'}" class="btn btn-primary">Register</router-link>
      <hr>
      <small>...or if you have an account already.</small>
      <router-link :to="{name: 'login'}" class="btn btn-secondary">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
