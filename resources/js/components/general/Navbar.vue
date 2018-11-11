<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-success">
      <router-link :to="{ name:'welcome' }" class="navbar-brand">Expense Tracker</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'welcome' }" class="nav-link">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li v-if="!this.$store.getters.isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
          </li>
          <li v-if="!this.$store.getters.isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
          </li>
          <li v-if="this.$store.getters.isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
          </li>
          <li v-if="this.$store.getters.isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'expenses' }" class="nav-link">Expenses</router-link>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>
export default {};
</script>

