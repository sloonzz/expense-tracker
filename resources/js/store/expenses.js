import axios from 'axios';

export default {
    namespaced: true,
    state: {
        expense: {}
    },
    getters: {

    },
    mutations: {
        expense: function(state, expense) {
            state.expense = expense;
        }
    },
    actions: {
        retrieveExpense: function(context, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get('/api/expenses/' + id)
                    .then(response => {
                        context.commit("expense", response.data.data);
                        console.log(response.data.data);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}