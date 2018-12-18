<template>
  <div>
    <pulse-loader id="spinner" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="container">
      <h1>{{this.$store.state.expenses.expense.name}}</h1>
      <h4>Quantity: {{this.$store.state.expenses.expense.quantity}}</h4>
      <h4>Cost: {{this.$store.state.expenses.expense.cost}}</h4>
      <p>{{this.$store.state.expenses.expense.description}}</p>
      <small class="small">Date: {{this.$store.state.expenses.expense.date}}</small>
      <br>
      <router-link to="/expenses" class="btn btn-secondary">Back to expenses</router-link>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    PulseLoader
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    let vm = this;
    let expense = this.$store.state.expenses.expenses.find(
      expense => expense.id === vm.$route.params.id
    );
    if (expense) {
      this.$store.commit("expenses/expense", expense);
      this.loading = false;
    } else {
      this.loading = true;
      this.$store
        .dispatch("expenses/retrieveExpense", this.$route.params.id)
        .then(response => {})
        .catch(error => {})
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>
