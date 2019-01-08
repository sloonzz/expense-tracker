<template>
  <div class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Are you sure?</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <p>You will be logged out.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="logout()" data-dismiss="modal">Logout</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logoutUser")
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
</style>
