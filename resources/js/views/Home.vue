<template>
  <div id="container">
    <div id="body" v-if="!loading">
      <Navbar class="mb-4"></Navbar>
      <div class="container">
        <div
          class="alert alert-success show alert-dismissible fade"
          v-for="(messageObject, uIndex) in this.$store.state.auth.messages"
          :key="uIndex"
        >
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class v-for="(message, index) in messageObject" :key="index">{{ message }}</div>
        </div>

        <div
          class="alert alert-danger show alert-dismissible fade"
          v-for="(errorMessage, uIndex) in this.$store.state.auth.errors"
          :key="uIndex"
        >
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class v-for="(error, index) in errorMessage" :key="index">{{ error }}</div>
        </div>
      </div>
      <router-view></router-view>
    </div>

    <Footer id="footer" v-if="!loading"></Footer>
    <pulse-loader id="spinner" :loading="loading"></pulse-loader>
  </div>
</template>

<script>
import Navbar from "../components/general/Navbar.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Footer from "../components/general/Footer.vue";
export default {
  components: {
    Navbar,
    PulseLoader,
    Footer
  },
  data() {
    return {
      loading: false
    };
  },
  mounted: function() {
    if (this.$store.state.auth.accessToken) {
      this.loading = true;
      this.$store
        .dispatch("auth/retrieveUserDetails")
        .then(response => {
          if (!this.$store.state.expenses.hasLoadedExpenses) {
            this.$store
              .dispatch("expenses/retrieveExpenses")
              .then(response2 => {
                this.loading = false;
                this.$store.commit("expenses/sort", "date");
                this.$store.commit("expenses/sort", "date");
              });
          } else {
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

$green: #38c172;
$white: #f9f9e8;
$footer-height: 100px;

#app {
  height: 100%;
  min-height: 100%;
}

#container {
  min-height: 100%;
  position: relative;
}

#body {
  padding-bottom: $footer-height; /* Height of the footer */
}

#footer {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  width: 100%;
  min-height: $footer-height; /* Height of the footer */
  background-color: darken($color: $green, $amount: 30);
  color: $white;
}

#spinner {
  text-align: center;
  padding-top: 25%;
  margin: auto;
}
</style>