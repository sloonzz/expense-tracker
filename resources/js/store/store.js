import axios from "axios";
export default {
    state: {
        count: 0,
        user: {},
        accessToken: localStorage.getItem("access_token") || null,
        validToken: false,
        errors: {}
    },
    getters: {
        isLoggedIn: function(state) {
            return state.accessToken !== null && state.validToken;
        }
    },
    mutations: {
        accessToken: function(state) {
            state.accessToken = localStorage.getItem("access_token");
        },
        user: function(state, user) {
            state.user = user;
        },
        isValidToken: function(state, validToken) {
            state.validToken = validToken;
        }
    },
    actions: {
        retrieveUser: function(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + context.state.accessToken;
                axios
                    .get("/api/user")
                    .then(response => {
                        context.commit("user", response.data);
                        context.commit("isValidToken", true);
                        resolve(response);
                    })
                    .catch(error => {
                        context.commit("isValidToken", false);
                        localStorage.removeItem("access_token");
                        reject(error);
                    });
            });
        },
        loginUser: function(context, { email, password }) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/login", {
                        email: email,
                        password: password
                    })
                    .then(response => {
                        localStorage.setItem(
                            "access_token",
                            response.data.access_token
                        );
                        context.commit("accessToken");
                        resolve(response);
                    })
                    .catch(error => {
                        localStorage.removeItem("access_token");
                        context.commit("accessToken");
                        reject(error);
                    });
            });
        },
        logoutUser: function(context) {
            return new Promise((resolve, reject) => {
                context.commit("accessToken");
                axios.defaults.headers.common.Authorization =
                    "Bearer " + context.state.accessToken;
                axios
                    .post("/api/logout")
                    .then(response => {
                        localStorage.removeItem("access_token");
                        context.commit("accessToken");
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        registerUser: function(
            context,
            { name, email, password, password_confirmation }
        ) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/register", {
                        name,
                        email,
                        password,
                        password_confirmation
                    })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};
