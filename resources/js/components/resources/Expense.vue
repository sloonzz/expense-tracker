<template>
<div class="container">
    <h1>{{this.$store.state.expenses.expense.name}}</h1>
    <h4>Quantity: {{this.$store.state.expenses.expense.quantity}}</h4>
    <h4>Cost: {{this.$store.state.expenses.expense.cost}}</h4>
    <p>{{this.$store.state.expenses.expense.description}}</p>
    <small class="small">Date: {{this.$store.state.expenses.expense.date}}</small>
    <br>
    <router-link to="/expenses" class="btn btn-secondary">Back to expenses</router-link>
</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("expenses/retrieveExpense", this.$route.params.id);
  }
};
</script>

<style>
</style>
