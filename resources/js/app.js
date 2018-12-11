/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");

import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import routes from "./routes";
import StoreData from "./store/store";
import Home from "./views/Home.vue";
import { Datetime } from "vue-datetime";

import "vue-datetime/dist/vue-datetime.css";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Datetime);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));
// Vue.component('Master', require('./components/main/Master.vue'));
Vue.component("datetime", Datetime);

const router = new VueRouter({
    routes,
    mode: "history"
});

const store = new Vuex.Store(StoreData);

const app = new Vue({
    el: "#app",
    router: router,
    components: { Home },
    store: store
});
