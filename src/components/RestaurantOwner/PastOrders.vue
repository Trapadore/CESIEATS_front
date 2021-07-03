<template>
    <div id="orders">
        <div v-if="loaded">
            <h1>Commandes en cours</h1>
            <v-card v-for="order in orders" :key="order.id" style="margin-top: 30px">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-row>
                                <h2>Prix : {{ order.price.toFixed(2) }}€</h2>
                            </v-row>
                            <v-row>
                                <v-list>
                                    <v-list-item v-for="article in order.orderContent" :key="article.id">
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="
                                                    'Type : ' +
                                                    article.type +
                                                    ' | Produit : ' +
                                                    article.name +
                                                    ' | quantité : ' +
                                                    article.quantity
                                                "
                                            ></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-row>
                        </v-col>
                        <v-spacer />
                        <v-col align="center">
                            <v-row no-gutters justify="end">
                                <v-col align-self="center">
                                    <!--                                <v-icon>mdi-calendar</v-icon>-->
                                </v-col>
                                <v-col>
                                    <!--                                <b>Date de commande</b>-->
                                    <!--                                {{ order.date }}-->
                                </v-col>
                                <v-col align-self="center">
                                    <v-icon>mdi-package-variant</v-icon>
                                </v-col>
                                <v-col>
                                    <b>Numéro de commande</b>
                                    {{ order._id }}
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
        <div v-else>
            <v-progress-circular :size="70" :width="7" color="green" indeterminate></v-progress-circular>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        loaded: false,
        restaurant: {},
        orders: [],
    }),
    methods: {
        validate(order) {
            var axios = require("axios");
            var data = JSON.stringify({
                userId: order.userId,
                restaurantId: order.restaurantId,
                orderContent: order.orderContent,
                orderState: 2,
                price: order.price,
            });

            var config = {
                method: "put",
                url: "http://localhost:9000/operations/" + order._id,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then((response) => {
                    this.orders.splice(order.id, 1);
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        refuse(order) {
            var axios = require("axios");
            var data = JSON.stringify({
                userId: order.userId,
                restaurantId: order.restaurantId,
                orderContent: order.orderContent,
                orderState: 3,
                price: order.price,
            });

            var config = {
                method: "put",
                url: "http://localhost:9000/operations/" + order._id,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then((response) => {
                    this.orders.splice(order.id, 1);
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    created: function () {
        console.log(JSON.parse(localStorage.user).id);
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({});
        var config1 = {
            method: "get",
            url: "http://localhost:9000/restaurants/owner/" + JSON.parse(localStorage.user).id,
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
            },
            data: data,
        };
        axios(config1)
            .then((response) => {
                this.restaurant = response.data[0];
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    watch: {
        restaurant: function (val) {
            console.log(val._id);
            var axios = require("axios");
            var qs = require("qs");
            var data = qs.stringify({});
            var config2 = {
                method: "get",
                url: "http://localhost:9000/operations/byrestaurant/" + val._id + "/bystate/2",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                },
                data: data,
            };
            axios(config2)
                .then((response) => {
                    console.log(response.data);
                    let i = 0;
                    response.data.forEach((order) => {
                        this.orders.push({ ...order, id: i });
                        i++;
                    });
                    this.loaded = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>
