import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        identity: {
            lastName: String,
            firstName: String,
            mail: "caca.boudin@gmail.com",
            gender: String,
            password: String,
        },
        cart: [],
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {},
});
