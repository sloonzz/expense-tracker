<template>
    <div class="container">
        <div class="form-group">
            <form v-if="!this.$store.getters.isLoggedIn">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" v-model="name" class="form-control" placeholder="name">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="email" class="form-control" placeholder="username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="password" class="form-control" placeholder="password">
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" name="password_confirmation" v-model="password_confirmation" class="form-control" placeholder="confirm password">
                </div>
                <button @click.prevent v-on:click="register" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("registerUser", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => {
          this.$router.push("/login");
          this.$store.commit("messages", [["Successfully registered!"]]);
        })
        .catch(error => {});
    }
  },
  created() {
    this.$store.commit("errors", null);
    this.$store.commit("messages", null);
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
  }
};
</script>