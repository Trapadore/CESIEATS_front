<template>
    <v-row style="height: 100%">
        <v-col md="auto">
            <v-navigation-drawer v-model="drawer" dark style="height: 100%">
                <v-sheet color="#2a2a2a" class="pa-4">
                    <v-avatar class="mb-4" color="blue" size="64">
                        <img :src="user.picture" alt="Avatar" />
                    </v-avatar>

                    <div>{{ user.email }}</div>
                </v-sheet>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item v-for="[icon, text] in links" :key="text" link @click="clickList(text)">
                        <v-list-item-icon>
                            <v-icon>{{ icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-col>
        <v-col>
            <v-container>
                <Profil v-if="menu === 'Profil'" />
                <Orders v-if="menu === 'Commandes'" />
                <Cart v-if="menu === 'Panier'" @location="move" />
            </v-container>
        </v-col>
        <v-snackbar v-model="snackbar">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</template>

<script>
import Profil from "../components/Profil";
import Orders from "../components/Orders";
import Cart from "../components/Cart";
import { mapState } from "vuex";

export default {
    components: { Cart, Orders, Profil },
    data: () => ({
        user: {
            email: "notConnected@connexion.fr",
            id: 0,
        },
        drawer: null,
        text: "Votre commande a été envoyée avec succès",
        snackbar: false,
        links: [
            ["mdi-account", "Profil"],
            ["mdi-basket", "Commandes"],
            ["mdi-cart", "Panier"],
        ],
        menu: "Profil",
    }),
    created: function () {
        if (this.$route.params.menu == "cart") {
            this.menu = "Panier";
        } else if (this.$route.params.menu == "orders") {
            this.menu = "Commandes";
            this.snackbar = true;
        }
        if (localStorage.user != undefined) {
            this.user = JSON.parse(localStorage.user);
        }
    },
    methods: {
        move() {
            this.menu = "Commandes";
            this.snackbar = true;
        },
        clickList(key) {
            this.menu = key;
        },
        computed: {
            ...mapState(["identity"]),
            //TODO does not work
        },
    },
};
</script>
