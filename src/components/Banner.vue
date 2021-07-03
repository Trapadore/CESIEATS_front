<template>
    <v-app-bar app color="#000000" dark>
        <v-btn icon to="/">
            <v-img width="60" src="../assets/Cesi_Eats_logo.jpg" />
        </v-btn>

        <v-spacer />
        <router-link to="/restaurants" class="link"> Restaurants </router-link>
        <v-spacer />
        <v-text-field hide-details prepend-icon="mdi-magnify" single-line></v-text-field>
        <v-spacer />
        <v-btn icon to="/compte/cart" v-if="isClient">
            <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn icon :to="'/' + link" v-if="logged">
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-spacer />
        <PopUpConnect v-if="!logged" @loggedEventName="changeLogged" />
        <v-btn dark v-else @click="disconnect" to="/">Déconnexion</v-btn>
    </v-app-bar>
</template>

<script>
import PopUpConnect from "./PopUpConnect";

export default {
    components: {
        PopUpConnect,
    },
    data() {
        return {
            dialog: false,
            logged: false,
            isClient: false,
            link: "",
        };
    },
    mounted() {
        this.logged = document.cookie === undefined ? false : this.read_cookie("logged") === "true";
    },
    methods: {
        read_cookie(cName) {
            return document.cookie
                .split("; ")
                .find((row) => row.startsWith(cName + "="))
                .split("=")[1];
        },
        disconnect() {
            this.logged = false;
            delete localStorage.user;
            delete document.cookie;
        },
        changeLogged(payload) {
            this.logged = payload.logged;
        },
    },
    watch: {
        logged: function (val) {
            document.cookie = "logged=" + val;
            this.isClient = localStorage.user ? JSON.parse(localStorage.user).userType === 1 : false;
            switch (JSON.parse(localStorage.user).userType) {
                case 1:
                    this.link = "compte";
                    break;
                case 2:
                    this.link = "livraisons";
                    break;
                case 3:
                    this.link = "myrestaurant";
                    break;
                case 4:
                    this.link = "commercial";
                    break;
                case 5:
                    this.link = "compte";
                    break;
                default:
                    this.link = "";
            }
        },
    },
};
</script>

<style lang="scss">
a {
    color: #dcc55e;
}
</style>
