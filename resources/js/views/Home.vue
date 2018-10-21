<template>
  <div>
    <Navbar class="mb-4"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../components/general/Navbar.vue";
export default {
  components: {
    Navbar
  },
  mounted: function() {
    if (this.$store.state.accessToken) {
      this.$store.dispatch("retrieveUser");
    }
  }
};
</script>
