<template>
  <form class="modal fade container">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Create new expense</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="date">Date</label>
            <datetime
              :placeholder="createdExpense.date"
              id="datetime"
              use12-hour
              type="datetime"
              input-class="form-control"
              name="date"
              v-model="createdExpense.date"
              auto
            ></datetime>
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              placeholder="Expense Name"
              v-model="createdExpense.name"
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-control"
              placeholder="Description"
              name="description"
              v-model="createdExpense.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="cost">Cost ({{this.$store.state.auth.currency}})</label>
            <input
              type="number"
              name="cost"
              class="form-control"
              placeholder="1"
              v-model="createdExpense.cost"
            >
          </div>
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              class="form-control"
              placeholder="1"
              v-model="createdExpense.quantity"
            >
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click.prevent="createExpense(createdExpense)"
            data-dismiss="modal"
            class="btn btn-primary"
          >CREATE</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    PulseLoader
  },
  data() {
    return {
      createdExpense: {
        id: 0,
        date: moment().format(),
        name: "",
        description: "",
        cost: 0,
        quantity: 0,
        time: ""
      },
      loading: false
    };
  },
  methods: {
    createExpense(expense) {
      let vm = this;
      this.loading = true;
      let oldDate = expense.date;
      expense.date = window.moment(expense.date).format("YYYY-MM-DD HH:mm:ss");

      axios.defaults.headers.common.Authorization =
        "Bearer " + this.$store.state.auth.accessToken;
      axios
        .post("/api/expenses", expense)
        .then(response => {
          vm.$store.commit("auth/messages", [
            ["Successfully created expense."]
          ]);
          vm.$store.commit("expenses/pushExpense", {
            id: response.data.data.id,
            date: expense.date,
            name: expense.name,
            description: expense.description,
            quantity: expense.quantity,
            cost: expense.cost
          });
          vm.$store.commit("expenses/sort", "date");
          vm.$store.commit("expenses/sort", "date");
          this.loading = false;

          expense.name = "";
          expense.description = "";
          expense.date = moment().format();
          expense.quantity = 0;
          expense.cost = 0;
        })
        .catch(error => {
          console.log(error);
          if (error.response) {
            this.$store.commit("auth/errors", error.response.data.errors);
          } else if (error.request) {
            this.$store.commit("auth/errors", error.request.data.errors);
          }
          this.loading = false;
          expense.date = oldDate;
        });
    }
  }
};
</script>

<style>
</style>
