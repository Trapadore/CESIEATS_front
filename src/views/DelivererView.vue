<template>
    <v-row style="height: 100%">
        <v-col md="auto">
            <v-navigation-drawer v-model="drawer" dark style="height: 100%">
                <v-sheet color="#2a2a2a" class="pa-4">
                    <v-avatar class="mb-4" color="blue" size="64"></v-avatar>

                    <div>Nom du restaurant</div>
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
                <PastDeliveries v-if="menu === 'Livraisons passées'" />
                <DeliveriesInProcess v-if="menu === 'Livraisons en cours'" />
                <WaitingDeliveries v-if="menu === 'Livraisons en attente'" />
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";
import DeliveriesInProcess from "../components/Deliverer/DeliveriesInProcess";
import PastDeliveries from "../components/Deliverer/PastDeliveries";
import WaitingDeliveries from "../components/Deliverer/WaitingDeliveries";
import Profil from "../components/Profil";

export default {
    components: {
        Profil,
        WaitingDeliveries,
        DeliveriesInProcess,
        PastDeliveries,
    },
    data: () => ({
        drawer: null,
        links: [
            ["mdi-account", "Profil"],
            ["mdi-basket", "Livraisons passées"],
            ["mdi-cart", "Livraisons en cours"],
            ["mdi-timer", "Livraisons en attente"],
        ],
        menu: "Livraisons en cours",
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
