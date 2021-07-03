<template>
    <v-row style="height: 100%">
        <v-col md="auto">
            <v-navigation-drawer v-model="drawer" dark style="height: 100%">
                <v-sheet color="#2a2a2a" class="pa-4">
                    <v-avatar class="mb-4" color="blue" size="64"></v-avatar>

                    <div>adresse.mail@gmail.com</div>
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
                <Dashboard v-if="menu === 'Tableau de bord'" />
                <Statistics v-if="menu === 'Statistiques'" />
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";
import Statistics from "../components/RestaurantOwner/Statistics";
import Profil from "../components/Profil";
import Dashboard from "../components/Business/Dashboard";

export default {
    components: {
        Dashboard,
        Profil,
        Statistics,
    },
    data: () => ({
        drawer: null,
        links: [
            ["mdi-account", "Profil"],
            ["mdi-grid", "Tableau de bord"],
            ["mdi-equalizer", "Statistiques"],
        ],
        menu: "Profil",
    }),
    methods: {
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
