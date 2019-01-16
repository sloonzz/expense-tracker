<template>
  <div>
    <pulse-loader id="spinner" :loading="loading"></pulse-loader>
    <div class="container-fluid" v-if="!loading">
      <Summary class="mb-2"></Summary>
      <div class="container">
        <div class="row justify-content-between">
          <button
            type="button"
            class="btn btn-primary mb-2 col-sm-4 col-lg-2"
            data-toggle="modal"
            data-target="#createExpensesForm"
          >Create New Expense</button>
          
          <button
            type="button"
            class="btn btn-secondary mb-2 col-sm-3 col-lg-1"
            @click="getAllExpenses()"
          >Refresh</button>
        </div>
      </div>
      <form class="modal fade container" id="createExpensesForm">
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
      <hr class="container">

      <h2 class="container">Expenses:</h2>
      <div class="table-responsive container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th @click.prevent="sortDate" scope="col">Date</th>
              <th @click.prevent="sortDate" scope="col">Time</th>
              <th @click.prevent="sortName" scope="col">Name</th>
              <th @click.prevent="sortDescription" scope="col">Description</th>
              <th @click.prevent="sortCost" scope="col">Cost ({{$store.state.auth.currency}})</th>
              <th @click.prevent="sortQuantity" scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="expense in this.$store.state.expenses.expenses">
              <tr @click="expand('expensesDetails' + expense.id)" :key="expense.id">
                <!-- IF NOT EDITING -->
                <template v-if="editableID !== expense.id || !editing">
                  <td>{{this.moment(getDate(expense.date)).format('MMMM Do YYYY')}}</td>
                  <td>{{this.moment(expense.date).format('h:mm a')}}</td>
                  <td>{{expense.name}}</td>
                  <td>{{expense.description}}</td>
                  <td>{{expense.cost}} {{$store.state.auth.currency}}</td>
                  <td>{{expense.quantity}}</td>
                </template>
                <!-- EDITING -->
                <template v-else-if="editing">
                  <td>
                    <input
                      type="date"
                      name="date"
                      class="form-control"
                      v-model="editableExpense.date"
                    >
                  </td>
                  <td>
                    <input
                      type="time"
                      name="time"
                      class="form-control"
                      v-model="editableExpense.time"
                    >
                  </td>
                  <td>
                    <textarea class="form-control" cols="5" rows="4" v-model="editableExpense.name"></textarea>
                  </td>
                  <td>
                    <textarea
                      class="form-control"
                      cols="40"
                      rows="4"
                      v-model="editableExpense.description"
                    ></textarea>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="cost"
                      class="form-control"
                      v-model="editableExpense.cost"
                    >
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      class="form-control"
                      v-model="editableExpense.quantity"
                    >
                  </td>
                </template>
              </tr>
              <!-- COLLAPSING ROW -->
              <tr
                class="custom-invisible custom-toggleable"
                :id="'expensesDetails' + expense.id"
                :key="expense.id + expense.name"
              >
                <!-- IF NOT EDITING -->
                <template v-if="editableID !== expense.id || !editing">
                  <td>
                    <router-link
                      :id="'expensesDetails' + expense.id"
                      :to="{ name: 'expense', params: { id: expense.id } }"
                      class="btn btn-sm btn-secondary"
                    >DETAILS</router-link>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-primary"
                      :id="'expensesDetails' + expense.id"
                      @click.prevent="edit(expense)"
                    >EDIT</button>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-danger"
                      :id="'expensesDetails' + expense.id"
                      @click.prevent="deleteExpense(expense)"
                    >DELETE</button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <!-- IF EDITING -->
                <template v-else-if="editing">
                  <td>
                    <router-link
                      v-if="!loading"
                      :to="{ name: 'expense', params: { id: expense.id } }"
                      class="btn btn-sm btn-dark"
                    >DETAILS</router-link>
                  </td>
                  <td>
                    <button @click.prevent="unedit()" class="btn btn-sm btn-secondary">EXIT EDITING</button>
                  </td>
                  <td>
                    <button
                      @click.prevent="save(editableExpense)"
                      class="btn btn-sm btn-primary"
                    >SAVE</button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Summary from "./Summary.vue";
export default {
  components: {
    PulseLoader,
    Summary
  },
  data() {
    return {
      loading: false,
      editing: false,
      hasLoadedExpenses: false,
      expenses: [],
      editableExpense: {
        id: 0,
        date: "",
        name: "",
        description: "",
        cost: 0,
        quantity: 0,
        time: ""
      },
      createdExpense: {
        id: 0,
        date: moment().format(),
        name: "",
        description: "",
        cost: 0,
        quantity: 0,
        time: ""
      },
      editableID: 0,
      sort: {
        date: false,
        name: false,
        cost: false,
        quantity: false,
        description: false
      }
    };
  },
  computed: {},
  methods: {
    sortDate() {
      if (!this.sort.date) {
        this.expenses.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        this.sort.name = false;
        this.sort.cost = false;
        this.sort.quantity = false;
        this.sort.date = true;
        this.sort.description = false;
        this.editing = false;
      } else {
        this.expenses.reverse();
      }
    },
    sortCost() {
      if (!this.sort.cost) {
        this.expenses.sort((a, b) => {
          return a.cost - b.cost;
        });
        this.sort.name = false;
        this.sort.cost = true;
        this.sort.quantity = false;
        this.sort.date = false;
        this.sort.description = false;
        this.editing = false;
      } else {
        this.expenses.reverse();
      }
    },
    sortQuantity() {
      if (!this.sort.quantity) {
        this.expenses.sort((a, b) => {
          return a.quantity - b.quantity;
        });
        this.sort.name = false;
        this.sort.cost = false;
        this.sort.quantity = true;
        this.sort.date = false;
        this.sort.description = false;
        this.editing = false;
      } else {
        this.expenses.reverse();
      }
    },
    sortName() {
      if (!this.sort.name) {
        this.expenses.sort((a, b) => {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        this.sort.name = true;
        this.sort.cost = false;
        this.sort.quantity = false;
        this.sort.date = false;
        this.sort.description = false;
        this.editing = false;
      } else {
        this.expenses.reverse();
      }
    },
    sortDescription() {
      if (!this.sort.description) {
        this.expenses.sort((a, b) => {
          var x = a.description.toLowerCase();
          var y = b.description.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        this.sort.name = false;
        this.sort.cost = false;
        this.sort.quantity = false;
        this.sort.date = false;
        this.sort.description = true;
        this.editing = false;
      } else {
        this.expenses.reverse();
      }
    },
    edit(expense) {
      this.editableID = expense.id;
      this.editableExpense = window._.cloneDeep(expense);
      this.editableExpense.date = expense.date.split(" ")[0];
      this.editableExpense.time = expense.date.split(" ")[1];
      this.editing = true;
      this.$store.commit("auth/messages", null);
    },
    save(expense) {
      this.editing = false;
      let vm = this;
      this.loading = true;

      if (expense.date && expense.time) {
        expense.date = expense.date + " " + expense.time;
      }

      axios.defaults.headers.common.Authorization =
        "Bearer " + this.$store.state.auth.accessToken;
      axios
        .put("/api/expenses/" + expense.id, expense)
        .then(response => {
          vm.$store.commit("auth/messages", [["Successfully edited expense."]]);
          this.loading = false;
          vm.$set(
            vm.expenses,
            vm.expenses.findIndex(item => item.id == expense.id),
            expense
          );
        })
        .catch(error => {
          console.log(error.data);
          this.loading = false;
        });
    },
    deleteExpense(expense) {
      this.editing = false;
      let vm = this;
      if (confirm("You will be deleting this expense. Are you sure?")) {
        axios.defaults.headers.common.Authorization =
          "Bearer " + this.$store.state.auth.accessToken;
        axios
          .delete("/api/expenses/" + expense.id)
          .then(response => {
            vm.$store.commit("auth/messages", [
              ["Successfully deleted expense."]
            ]);
            vm.$delete(
              vm.expenses,
              vm.expenses.findIndex(item => item.id == expense.id)
            );
            vm.$store.commit("expenses/expenses", vm.expenses);
          })
          .catch(error => {
            console.log(error.data);
          });
      }
    },
    createExpense(expense) {
      this.editing = false;
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
          vm.expenses.push({
            id: response.data.data.id,
            date: expense.date,
            name: expense.name,
            description: expense.description,
            quantity: expense.quantity,
            cost: expense.cost
          });
          vm.$store.commit("expenses/expenses", vm.expenses);
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
    },
    unedit() {
      this.editing = false;
    },
    getTime(dateTime) {
      return dateTime.split(" ")[1];
    },
    getDate(dateTime) {
      return dateTime.split(" ")[0];
    },
    getAllExpenses() {
      this.loading = true;
      this.$store
        .dispatch("expenses/retrieveExpenses")
        .then(response => {
          this.loading = false;
          this.sortDate();
          this.sortDate();
        })
        .catch(error => {
          this.loading = false;
        });
    },
    expand(id) {
      let element = document.getElementById(id);
      if (element.classList.contains("custom-invisible")) {
        element.classList.remove("custom-invisible");
      } else {
        element.classList.add("custom-invisible");
      }
    }
  },
  mounted() {
    if (this.$store.state.expenses.hasLoadedExpenses) {
      this.expenses = this.$store.state.expenses.expenses;
    } else {
      this.getAllExpenses();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.custom-toggleable {
  height: 50px;
  transition: height 0.3s ease-in;
}

.custom-toggleable > * {
  height: auto;
  transition-property: height;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.custom-invisible {
  height: 0px;
  transition-property: height;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.custom-invisible > * {
  display: none;
  height: 0px;
  transition-property: height;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.custom-visible {
  height: auto;
  transition: height 0.3s ease-in;
}
</style>


