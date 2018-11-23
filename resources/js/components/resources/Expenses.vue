<template>
    <div class="container" v-if="!loading">
      <h2>Create new expense:</h2>
        <form>
          <div class="form-group">
            <label for="date">Date</label>
            <input type="date" name="date" class="form-control" v-model="createdExpense.date">
          </div>
          <div class="form-group">
            <label for="time">Time</label>
            <input type="time" name="time" class="form-control" v-model="createdExpense.time">
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" class="form-control" placeholder="name" v-model="createdExpense.name">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" placeholder="description" name="description" v-model="createdExpense.description"></textarea>
          </div>
          <div class="form-group">
            <label for="cost">Cost</label>
            <input type="number" name="cost" class="form-control" placeholder="0" v-model="createdExpense.cost">
          </div>
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="number" name="quantity" class="form-control" placeholder="0" v-model="createdExpense.quantity">
          </div>
          <button @click.prevent="createExpense(createdExpense)" class="btn btn-primary">CREATE</button>
        </form>
        <br/>

        <h2>Expenses:</h2>
        <div class="table-responsive">
          <table class="table table-striped">
              <thead>
                  <tr>
                      <th @click.prevent="sortDate" scope="col">Date</th>
                      <th @click.prevent="sortDate" scope="col">Time</th>
                      <th @click.prevent="sortName" scope="col">Name</th>
                      <th @click.prevent="sortDescription" scope="col">Description</th>
                      <th @click.prevent="sortCost" scope="col">Cost</th>
                      <th @click.prevent="sortQuantity" scope="col">Quantity</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th></th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="expense in this.expenses" :key="expense.id">
                      <template v-if="editableID !== expense.id || !editing">
                        <td>{{getDate(expense.date)}}</td>
                        <td>{{getTime(expense.date)}}</td>
                        <td>{{expense.name}}</td>
                        <td>{{expense.description}}</td>
                        <td>{{expense.cost}}</td>
                        <td>{{expense.quantity}}</td>
                        <td>
                          <router-link :to="{ name: 'expense', params: { id: expense.id } }" class="btn btn-sm btn-secondary">DETAILS</router-link>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-primary" @click.prevent="edit(expense)">EDIT</button>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-danger" @click.prevent="deleteExpense(expense)">DELETE</button>                        
                        </td>
                        <td></td>
                      </template>

                      <template v-else-if="editing">
                        <td>
                        <!-- 
                          
                          TODO: Separate this to date and time 
                          
                          -->
                          <input type="date" name="date" class="form-control" v-model="editableExpense.date">
                        </td>
                        <td>
                          <input type="time" name="time" class="form-control" v-model="editableExpense.time">
                        </td>
                        <td>
                          <textarea class="form-control" cols="5" rows="4" v-model="editableExpense.name"></textarea>
                        </td>
                        <td>
                          <textarea class="form-control" cols="40" rows="4" v-model="editableExpense.description"></textarea>
                        </td>
                        <td>
                          <input type="number" name="cost" class="form-control" v-model="editableExpense.cost">
                        </td>
                        <td>
                          <input type="number" name="quantity" class="form-control" v-model="editableExpense.quantity">
                        </td>
                        <td><router-link v-if="!loading" :to="{ name: 'expense', params: { id: expense.id } }" class="btn btn-sm btn-dark">DETAILS</router-link></td>
                        <td><button @click.prevent="unedit()" class="btn btn-sm btn-secondary">EXIT EDITING</button></td>
                        <td>
                          <button @click.prevent="save(editableExpense)" class="btn btn-sm btn-primary">SAVE</button>
                        </td>
                        <td></td>
                      </template>
                  </tr>
              </tbody>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      editing: false,
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
        date: "",
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

      if (expense.date && expense.time) {
        expense.date = expense.date + " " + expense.time;
      }
      axios.defaults.headers.common.Authorization =
        "Bearer " + this.$store.state.auth.accessToken;
      axios
        .put("/api/expenses" + expense.id, expense)
        .then(response => {
          vm.$store.commit("auth/messages", [["Successfully edited expense."]]);
          vm.$set(
            vm.expenses,
            vm.expenses.findIndex(item => item.id == expense.id),
            expense
          );
        })
        .catch(error => {
          console.log(error.data);
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
      if (expense.date && expense.time) {
        expense.date = expense.date + " " + expense.time;
      }
      axios.defaults.headers.common.Authorization =
        "Bearer " + this.$store.state.auth.accessToken;
      axios
        .post("/api/expenses", expense)
        .then(response => {
          vm.$store.commit("auth/messages", [
            ["Successfully created expense."]
          ]);
          expense.id = response.data.id;
          vm.expenses.push({
            id: expense.id,
            date: expense.date,
            name: expense.name,
            description: expense.description,
            quantity: expense.quantity,
            cost: expense.cost
          });
          this.loading = false;
          expense.name = "";
          expense.description = "";
          expense.time = "";
          expense.quantity = 0;
          expense.cost = 0;
        })
        .catch(error => {
          console.log(error.data);
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
    }
  },
  mounted() {
    this.loading = true;
    axios.defaults.headers.common.Authorization =
      "Bearer " + this.$store.state.auth.accessToken;
    axios
      .get("/api/expenses")
      .then(response => {
        this.expenses = response.data.data;
        this.loading = false;
      })
      .catch(error => {});
  }
};
</script>
