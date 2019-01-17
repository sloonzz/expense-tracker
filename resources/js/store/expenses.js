import axios from "axios";

export default {
    namespaced: true,
    state: {
        expense: {},
        expenses: [],
        hasLoadedExpenses: false,
        sort: {
            date: false,
            name: false,
            cost: false,
            quantity: false,
            description: false
        }
    },
    getters: {
        costWithCurrency: function(state, cost) {
            return cost + " " + state.currency;
        }
    },
    mutations: {
        expense: function(state, expense) {
            state.expense = expense;
        },
        hasLoadedExpenses: function(state, hasLoadedExpenses) {
            state.hasLoadedExpenses = hasLoadedExpenses;
        },
        expenses: function(state, expenses) {
            state.expenses = expenses;
        },
        pushExpense: function(state, expense) {
            state.expenses.push(expense);
        },
        deleteExpense: function(state, index) {
            state.expenses.splice(index, 1);
        },
        replaceExpense: function(state, payload) {
            Vue.set(state.expenses, payload.index, payload.expense);
        },
        sort: function(state, sortBy) {
            if (!state.sort[sortBy]) {
                // Sorting here
                switch (sortBy) {
                    case "date":
                        state.expenses.sort((a, b) => {
                            return new Date(a.date) - new Date(b.date);
                        });
                        state.sort.quantity = false;
                        state.sort.name = false;
                        state.sort.cost = false;
                        state.sort.description = false;
                        break;
                    case "cost":
                        state.expenses.sort((a, b) => {
                            return a.cost - b.cost;
                        });
                        state.sort.quantity = false;
                        state.sort.name = false;
                        state.sort.description = false;
                        state.sort.date = false;
                        break;
                    case "quantity":
                        state.expenses.sort((a, b) => {
                            return a.quantity - b.quantity;
                        });
                        state.sort.name = false;
                        state.sort.cost = false;
                        state.sort.description = false;
                        state.sort.date = false;
                        break;
                    case "name":
                        state.expenses.sort((a, b) => {
                            let x = a.name.toLowerCase();
                            let y = b.name.toLowerCase();
                            if (x < y) {
                                return -1;
                            }
                            if (x > y) {
                                return 1;
                            }
                            return 0;
                        });
                        state.sort.quantity = false;
                        state.sort.cost = false;
                        state.sort.description = false;
                        state.sort.date = false;
                        break;
                    case "description":
                        state.expenses.sort((a, b) => {
                            let x = a.description.toLowerCase();
                            let y = b.description.toLowerCase();
                            if (x < y) {
                                return -1;
                            }
                            if (x > y) {
                                return 1;
                            }
                            return 0;
                        });
                        state.sort.quantity = false;
                        state.sort.name = false;
                        state.sort.cost = false;
                        state.sort.date = false;
                        break;

                    default:
                        break;
                }
                state.sort[sortBy] = true;
            } else {
                // If sorted already, just reverse the sort.
                state.expenses.reverse();
                state.sort[sortBy] = false;
            }
        }
    },
    actions: {
        retrieveExpenses: function(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + context.rootState.auth.accessToken;
                axios
                    .get("/api/expenses")
                    .then(response => {
                        context.commit("expenses", response.data.data);
                        context.commit("hasLoadedExpenses", true);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        retrieveExpense: function(context, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/api/expenses/" + id)
                    .then(response => {
                        context.commit("expense", response.data.data);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        createExpense: function(context, expense) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + context.rootState.auth.accessToken;
                axios
                    .post("/api/expenses", expense)
                    .then(response => {
                        context.commit("auth/messages", [
                            ["Successfully created expense."]
                        ]);
                        resolve(response);
                    })
                    .catch(error => {
                        context.commit("auth/errors", error);
                        reject(error);
                    });
            });
        },
        deleteExpense(context, expense) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + context.rootState.auth.accessToken;
                axios
                    .delete("/api/expenses/" + expense.id)
                    .then(response => {
                        context.commit("auth/messages", [
                            ["Successfully deleted expense."]
                        ]);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};
