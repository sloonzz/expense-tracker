<template>
    <div class="container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th @click.prevent="sortDate" scope="col">Date</th>
                    <th @click.prevent="sortName" scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th @click.prevent="sortCost" scope="col">Cost</th>
                    <th @click.prevent="sortQuantity" scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(expense, index) in this.expenses" :key="index">
                    <template v-if="!editing">
                      <td @click.prevent="edit">{{expense.date}}</td>
                      <td @click.prevent="edit">{{expense.name}}</td>
                      <td @click.prevent="edit">{{expense.description}}</td>
                      <td @click.prevent="edit">{{expense.cost}}</td>
                      <td @click.prevent="edit">{{expense.quantity}}</td>
                    </template>
                    <template v-else>
                      <input type="date" name="date">
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
      editing: false,
      expenses: [],
      expense: {
        date: "",
        name: "",
        description: "",
        cost: 0,
        quantity: 0
      },
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
    edit() {
      this.editing = true;
      console.log("EDIT");
    }
  },
  mounted() {
    axios
      .get("/api/expenses")
      .then(response => {
        this.expenses = response.data.data;
      })
      .catch(error => {});
  }
};
</script>
