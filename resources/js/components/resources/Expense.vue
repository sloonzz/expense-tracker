<template>
<div class="container">
    <h1>{{this.$store.state.expense.name}}</h1>
    <h4>Quantity: {{this.$store.state.expense.quantity}}</h4>
    <h4>Cost: {{this.$store.state.expense.cost}}</h4>
    <p>{{this.$store.state.expense.description}}</p>
    <small class="small">Date: {{this.$store.state.expense.date}}</small>
    <br>
    <router-link to="/expenses" class="btn btn-secondary">Back to expenses</router-link>
</div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch("retrieveExpense", this.$route.params.id);
    }
}
</script>

<style>

</style>
