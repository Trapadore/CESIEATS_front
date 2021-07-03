<template>
    <div id="cart">
        <h1 v-if="!hasArticle">Vous n'avez pas de commande en cours</h1>
        <template v-else>
            <v-row>
                <v-col>
                    <h1>Panier ({{ countProducts }} produits)</h1>
                    <v-card v-for="article in articles" :key="article.id" style="margin-top: 30px">
                        <v-card-text>
                            <v-row>
                                <v-col align-self="start">
                                    <img
                                        :src="'data:image/jpeg;base64,' + article.image"
                                        alt="Girl in a jacket"
                                        width="100%"
                                    />
                                </v-col>
                                <v-col>
                                    <v-row justify="end">
                                        <v-btn @click="deleteItem(article.id)"><v-icon>mdi-delete</v-icon></v-btn>
                                    </v-row>
                                    <v-row style="height: 100%" justify="end" align="end">
                                        <b style="width: 100%">{{ article.price * article.quantity }} € </b>
                                        <v-select
                                            :items="items"
                                            v-model="article.quantity"
                                            :label="article.quantity"
                                            dense
                                            solo
                                            style="max-width: 200px"
                                        ></v-select>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="4">
                    <h1>Récapitulatif</h1>
                    <v-card style="margin-top: 30px">
                        <v-card-text>
                            <b>Un code promo ?</b>
                            <v-text-field solo label="Écrivez le ici"></v-text-field>
                            <v-btn dark>Valider</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-card style="margin-top: 30px">
                        <v-card-text>
                            Panier {{ countTotal }}€ Frais de livraisons 4,00€ <b>Total</b> (tva incluse)
                            {{ countTotal + 4 }}€
                            <v-btn dark @click="order">Valider mon panier</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <v-snackbar v-model="snackbar">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data: () => ({
        hasArticle: true,
        count: 0,
        items: [0, 1, 2, 3, 4, 5],
        text: "Votre commande a été envoyé avec succès",
        snackbar: false,
        articles: [],
    }),
    created: function () {
        this.articles = JSON.parse(localStorage.cart);
    },
    methods: {
        order() {
            let operation = {
                userId: this.read_cookie("userId"),
                userAddress: JSON.parse(localStorage.user).address,
                restaurantId: this.articles[0].restaurantId,
                orderContent: this.articles,
                orderState: 1,
                price: this.countTotal,
            };

            console.log(operation);

            for (let i = 0; i < operation.orderContent.length; i++) {
                delete operation.orderContent[i].image;
            }

            operation = JSON.parse(JSON.stringify(operation));

            var axios = require("axios");
            //var qs = require("qs");
            var data = JSON.stringify(operation);
            var config = {
                method: "post",
                url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/operations",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then(() => {
                    this.text = "Votre commande a été envoyé avec succès";
                    this.snackbar = true;
                    delete localStorage.cart;
                    this.articles = [];
                    this.$emit("location", "orders");
                })
                .catch((error) => {
                    this.snackbar = true;
                    this.text =
                        "Une erreur est survenue lors de votre commande, veuillez réessayer plus tard \n erreur : " +
                        error;
                });
        },
        read_cookie(cName) {
            return document.cookie
                .split("; ")
                .find((row) => row.startsWith(cName + "="))
                .split("=")[1];
        },
        deleteItem(id) {
            const finder = (element) => element.id === id;
            let storage = JSON.parse(localStorage.cart);
            let index = storage.findIndex(finder);
            storage.splice(index, 1);
            const parsed = JSON.stringify(storage);
            localStorage.setItem("cart", parsed);
            this.articles = JSON.parse(localStorage.cart);
        },
    },
    computed: {
        countTotal() {
            let total = 0;
            for (let i = 0; i < this.articles.length; i++) {
                total += this.articles[i].quantity * this.articles[i].price;
            }
            return total;
        },
        countProducts() {
            return this.articles.length;
        },
    },
};
</script>
