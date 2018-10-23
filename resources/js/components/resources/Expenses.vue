<template>
    <div class="container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(expense, index) in this.expenses" :key="index">
                    <td>{{expense.date}}</td>
                    <td>{{expense.name}}</td>
                    <td>{{expense.description}}</td>
                    <td>{{expense.cost}}</td>
                    <td>{{expense.quantity}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default{
    data() {
        return {
            editing: false,
            expenses: [],
            expense: {}
        }
    },
    mounted() {
        axios.get('/api/expenses').then(response => {
            this.expenses = response.data.data;
        }).catch(error => {
            
        })
    }
}
</script>
