<template>
    <div id="orders">
        <h1>Commandes</h1>
        <v-card v-for="order in orders" :key="order.id" style="margin-top: 30px">
            <v-card-text>
                <v-row>
                    <v-col cols="3" class="d-flex align-center justify-start" style="margin-left: 5%">
                        <v-row :style="'font-size: xx-large; color: ' + translateColor(order.orderState)">
                            {{ translateState(order.orderState) }}
                        </v-row>
                    </v-col>
                    <v-col align="center">
                        <v-row no-gutters justify="end">
                            <v-col>
                                <v-icon>mdi-currency-eur</v-icon>
                            </v-col>
                            <v-col>
                                <b>Prix total de la commande</b>
                                {{ order.price }}
                            </v-col>
                            <v-col align-self="center">
                                <v-icon>mdi-calendar</v-icon>
                            </v-col>
                            <v-col>
                                <b>Date de commande</b>
                                {{ order.createdAt }}
                            </v-col>
                            <v-col align-self="center">
                                <v-icon>mdi-package-variant</v-icon>
                            </v-col>
                            <v-col>
                                <b>Numéro de commande</b>
                                {{ order._id }}
                            </v-col>
                        </v-row>
                        <v-row justify="end">
                            <v-dialog transition="dialog-bottom-transition" max-width="600">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" dark> Détails de la commande </v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="primary" dark>Récapitulatif de la commande</v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col>Nom</v-col>
                                                <v-col>Prix</v-col>
                                                <v-col>Quantité</v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <div v-for="product in order.orderContent" :key="product.id">
                                                <OrderList :product="product"></OrderList>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-row>
                                                <v-col>Total</v-col>
                                                <v-col>{{ order.price }}€</v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialog.value = false">Close</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import OrderList from "../components/OrderList.vue";
export default {
    components: {
        OrderList,
    },
    data: () => ({
        orders: [],
        snackbar: false,
        orderState: [
            "Commandée",
            "En cours de préparation",
            "Refusée par le restaurant",
            "En cours de livraison",
            "Livrée",
        ],
        orderColors: ["#4191f2", "#e1e851", "#f0271d", "#e8ac51", "#48d95b"],
    }),
    created() {
        var axios = require("axios");
        var data = "";

        var config = {
            method: "get",
            url: "http://localhost:9000/operations/byuser/60d9de536f095a670c9e1eed",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                this.orders = response.data;
            })
            // eslint-disable-next-line no-unused-vars
            .catch(function (error) {});
    },
    methods: {
        translateState(stateId) {
            return this.orderState[stateId - 1];
        },
        translateColor(stateId) {
            return this.orderColors[stateId - 1];
        },
    },
};
</script>
