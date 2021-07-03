<template>
    <div id="orders">
        <h1>Livraisons en attente</h1>
        <v-card v-for="delivery in deliveries" :key="delivery._id" style="margin-top: 30px">
            <v-card-text>
                <v-row>
                    <v-col lg="6">
                        <v-row>
                            <h2>{{ delivery.client }}</h2>
                        </v-row>
                        <v-row>
                            <v-list>
                                <v-list-item>
                                    Adresse de départ: {{ finder(delivery.restaurantId).address }}
                                </v-list-item>
                                <v-list-item> Adresse de livraison : {{ delivery.userAddress }} </v-list-item>
                            </v-list>
                        </v-row>
                    </v-col>
                    <v-col align="center">
                        <v-row no-gutters justify="end">
                            <v-col align-self="center">
                                <v-icon>mdi-calendar</v-icon>
                            </v-col>
                            <v-col>
                                <b>Date de commande</b>
                                {{ delivery.createdAt }}
                            </v-col>
                            <v-col align-self="center">
                                <v-icon>mdi-package-variant</v-icon>
                            </v-col>
                            <v-col>
                                <b>Numéro de commande</b>
                                {{ delivery._id }}
                            </v-col>
                        </v-row>
                        <v-row justify="end">
                            <v-btn color="success" style="margin-right: 30px" @click="updateOperation(delivery)">
                                Accepter
                            </v-btn>
                            <v-btn color="error" style="margin-right: 30px" @click="refuseOperation(delivery._id)">
                                Refuser</v-btn
                            >
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        restaurants: [],
        deliveries: [],
        whiteList: [],
    }),
    created() {
        if (localStorage.whiteList !== undefined) {
            this.whiteList = JSON.parse(localStorage.whiteList);
        }
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({});
        var config = {
            method: "get",
            url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/restaurants/",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                this.restaurants = response.data.rows;
            })
            .catch(function (error) {
                console.log(error);
            });

        axios = require("axios");
        qs = require("qs");
        data = qs.stringify({});
        config = {
            method: "get",
            url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/operations/bystate/2",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                this.deliveries = JSON.parse(JSON.stringify(response.data));
                for (let i = 0; i < this.whiteList.length; i++) {
                    for (let j = 0; j < this.deliveries.length; j++) {
                        if (this.whiteList[i] === this.deliveries[j]._id) {
                            this.deliveries.splice(j, 1);
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        finder(id) {
            const finder = (element) => element.id === id;
            return this.restaurants.find(finder);
        },
        updateOperation(operation) {
            operation.orderState = 4;
            operation.delivererId = JSON.parse(localStorage.user).id;
            delete operation.createdAt;
            delete operation.updatedAt;
            operation = JSON.stringify(operation);
            console.log(operation);

            var axios = require("axios");
            //var data = JSON.stringify(operation);

            var config = {
                method: "put",
                url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/operations/" + JSON.parse(operation)._id,
                headers: {
                    // eslint-disable-next-line prettier/prettier
                    'Authorization':
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGRjMGEzMTMxYmVhNjU5Y2NkNTZjNiIsImlhdCI6MTYyNTE5NTY0NCwiZXhwIjoxNjI1MTk3NDQ0fQ.B9ykqA9AzyPtlZcz_wbrbVFE56hR-JmQvidM7mSV7hE",
                    "Content-Type": "application/json",
                },
                data: operation,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        refuseOperation(id) {
            this.whiteList.push(id);
            localStorage.whiteList = JSON.stringify(this.whiteList);
            for (let i = 0; i < this.whiteList.length; i++) {
                for (let j = 0; j < this.deliveries.length; j++) {
                    if (this.whiteList[i] === this.deliveries[j]._id) {
                        this.deliveries.splice(j, 1);
                    }
                }
            }
        },
    },
};
</script>
