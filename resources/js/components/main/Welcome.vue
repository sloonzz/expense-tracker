<template>
  <div class="container">
    <h1 v-if="this.$store.getters.loggedIn">
      Welcome, {{ this.$store.state.user.name }}
    </h1>
    <h1 v-else>
      Create an account now.
    </h1>
  </div>
</template>

<script>
export default {};
</script>
