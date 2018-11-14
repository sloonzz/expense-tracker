<template>
    <div class="container" v-if="!loading">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th @click.prevent="sortDate" scope="col">Date</th>
                    <th @click.prevent="sortName" scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th @click.prevent="sortCost" scope="col">Cost</th>
                    <th @click.prevent="sortQuantity" scope="col">Quantity</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expense in this.expenses" :key="expense.id">
                    <template v-if="editableID !== expense.id || !editing">
                      <td>{{expense.date}}</td>
                      <td>{{expense.name}}</td>
                      <td>{{expense.description}}</td>
                      <td>{{expense.cost}}</td>
                      <td>{{expense.quantity}}</td>
                      <td @click.prevent="edit(expense)"><button class="btn btn-sm btn-secondary">EDIT</button></td>
                      <td><router-link :to="{ name: 'expense', params: { id: expense.id } }" class="btn btn-sm btn-primary">DETAILS</router-link></td>
                    </template>
                    <template v-else-if="editing">
                      <td>
                      <!-- 
                        
                        TODO: Separate this to date and time 
                        
                        -->
                        <input type="datetime-local" name="date" class="form-control" v-model="editableExpense.date">
                      </td>
                      <td>
                        <textarea class="form-control" v-model="editableExpense.name"></textarea>
                      </td>
                      <td>
                        <textarea class="form-control" v-model="editableExpense.description"></textarea>
                      </td>
                      <td>
                        <input type="number" name="cost" class="form-control" v-model="editableExpense.cost">
                      </td>
                      <td>
                        <input type="number" name="quantity" class="form-control" v-model="editableExpense.quantity">
                      </td>
                      <td>
                        <button @click.prevent="save(editableExpense)" class="btn btn-sm btn-primary">SAVE</button>
                      </td>
                    </template>
                </tr>
            </tbody>
        </table>
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
        quantity: 0
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
        this.editing = false;
      } else {
        this.expenses.reverse();
      }
    },
    edit(expense) {
      this.editableID = expense.id;
      this.editableExpense = window._.cloneDeep(expense);
      this.editing = true;
      this.$store.commit("messages", null)
    },
    save(expense) {
      this.editing = false;
      let expenseToBeSaved = this.expenses.find(expenseItem => {
        expenseItem.id == expense.id;
      });
      let vm = this;
      axios
        .put("/api/expenses/" + expense.id, expense)
        .then(response => {
          vm.$store.commit("messages", [
            ["Successfully edited expense."]
          ]);
          vm.$set(vm.expenses, vm.expenses.findIndex(item => item.id == expense.id), expense);
        })
        .catch(error => {
          console.log(error.data);
        });
    },
    unedit() {
      this.editing = false;
    }
  },
  mounted() {
    this.loading = true;
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
