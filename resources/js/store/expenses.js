import axios from "axios";

export default {
    namespaced: true,
    state: {
        expense: {},
        expenses: [],
        hasLoadedExpenses: false
    },
    getters: {},
    mutations: {
        expense: function(state, expense) {
            state.expense = expense;
        },
        hasLoadedExpenses: function(state, hasLoadedExpenses) {
            state.hasLoadedExpenses = hasLoadedExpenses;
        }
    },
    actions: {
        retrieveExpenses: function(context, id) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + context.rootState.auth.accessToken;
                axios
                    .get("/api/expenses")
                    .then(response => {
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
                        console.log(response.data.data);
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
            this.editing = false;
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
                        console.log(error.data);
                        reject(error);
                    });
            });
        }
    }
};
