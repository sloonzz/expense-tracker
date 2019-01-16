<template>
  <div class="container">
    <h1>Summary:</h1>
    <h2>You spent a total of {{totalExpense}} {{this.$store.state.auth.currency || 'units'}}.</h2>
    <h3>And {{totalExpenseToDate(new Date(dateMin), new Date(dateMax))}} {{this.$store.state.auth.currency || 'units'}} between {{dateToFormat(dateMin, 'MMMM Do YYYY')}} and {{dateToFormat(dateMax, 'MMMM Do YYYY')}}</h3>
    <div class="form-group">
      <label for="dateMin">From:</label>
      <datetime
        :placeholder="dateMin"
        id="datetime"
        use12-hour
        type="datetime"
        input-class="form-control"
        name="dateMin"
        v-model="dateMin"
        auto
      ></datetime>
    </div>
    <div class="form-group">
      <label for="dateMax">To:</label>
      <datetime
        :placeholder="dateMax"
        id="datetime"
        use12-hour
        type="datetime"
        input-class="form-control"
        name="dateMax"
        v-model="dateMax"
        auto
      ></datetime>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateMin: moment()
        .subtract(1, "months")
        .format(),
      dateMax: moment().format()
    };
  },
  mounted() {
    let vm = this;
    if (!this.$store.state.expenses.hasLoadedExpenses) {
      this.$store.dispatch("expenses/retrieveExpenses");
    }
  },
  methods: {
    moment: function() {
      return moment();
    },
    dateToFormat: function(date, format) {
      return moment(date).format(format);
    },
    totalExpenseToDate(dateMin, dateMax) {
      let recordsToDate = this.$store.state.expenses.expenses.filter(
        expense => {
          let date = new Date(expense.date);
          return date > dateMin && date < dateMax;
        }
      );
      return recordsToDate.reduce((total, expense) => {
        return total + expense.cost * expense.quantity;
      }, 0);
    }
  },
  computed: {
    totalExpense: function() {
      let totalExpense = this.$store.state.expenses.expenses.reduce(
        (total, expense) => {
          return total + expense.cost * expense.quantity;
        },
        0
      );
      return totalExpense;
    }
  }
};
</script>

