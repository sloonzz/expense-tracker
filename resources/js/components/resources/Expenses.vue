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
                </tr>
            </thead>
            <tbody>
                <tr v-for="(expense, index) in this.expenses" :key="index">
                    <template v-if="editableID !== expense.id">
                      <td>{{expense.date}}</td>
                      <td>{{expense.name}}</td>
                      <td>{{expense.description}}</td>
                      <td>{{expense.cost}}</td>
                      <td>{{expense.quantity}}</td>
                      <td @click.prevent="edit(expense.id)"><button class="btn btn-sm btn-secondary">EDIT</button></td>
                    </template>
                    <template v-else-if="editing">
                      <td>
                        <input type="date" name="date" class="form-control" v-model="expense.date">
                      </td>
                      <td>
                        <textarea class="form-control" v-model="expense.name"></textarea>
                      </td>
                      <td>
                        <textarea class="form-control" v-model="expense.description"></textarea>
                      </td>
                      <td>
                        <input type="number" name="cost" class="form-control" v-model="expense.cost">
                      </td>
                      <td>
                        <input type="number" name="quantity" class="form-control" v-model="expense.quantity">
                      </td>
                      <td>
                        <button @click.prevent="save(expense.id)" class="btn btn-sm btn-primary">SAVE</button>
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
      expense: {
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
    edit(id) {
      this.editableID = id;
      console.log(this.editableID);
      this.editing = true;
      console.log("EDIT");
    },
    save(id) {
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
