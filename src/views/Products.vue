<template>
    <div class="d-flex flex-wrap p-2 col-example" style="flex-wrap wrap">
        <v-row>
            <div v-for="entity in entities" :key="entity._id">
                <Product
                    :id="entity._id"
                    :title="entity.name"
                    :image="entity.image"
                    :price="entity.price"
                    :restaurantId="entity.restaurantId"
                    :type="$route.params.name"
                    @selected="appendToSelection"
                >
                </Product>
            </div>
        </v-row>
        <v-row class="justify-center">
            <v-btn @click="order"> Commander </v-btn>
        </v-row>
    </div>
</template>

<script>
import Product from "../components/ProductCard.vue";
export default {
    name: "App",
    components: {
        Product,
    },
    data() {
        return {
            entities: [],
            cart: [],
        };
    },
    created: function () {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({});
        var config;
        if (this.$route.params.name == "Menus") {
            config = {
                method: "get",
                url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/menus/byrestaurant/" + this.$route.params.id,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                },
                data: data,
            };
        } else {
            config = {
                method: "get",
                url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/products/byrestaurant/" + this.$route.params.id,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                },
                data: data,
            };
        }
        axios(config)
            .then((response) => {
                if (this.$route.params.name == "Menus") {
                    this.entities = response.data;
                } else {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].productType == this.$route.params.name) {
                            this.entities.push(response.data[i]);
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        appendToSelection(product) {
            if (this.cart.length == 0) {
                if (localStorage.cart !== undefined) {
                    if (localStorage.cart.length != 0) {
                        this.cart = JSON.parse(localStorage.cart);
                    }
                }
            }
            const isAlreadyListed = (element) => element.id == product.id;
            var index = this.cart.findIndex(isAlreadyListed);
            if (index == -1) {
                this.cart.push(product);
            } else {
                this.cart[index] = product;
            }
        },
        order() {
            const parsed = JSON.stringify(this.cart);
            localStorage.setItem("cart", parsed);
            this.$router.push("/compte/cart");
        },
    },
};
</script>

<style lang="scss">
body {
    background-color: #222222;
}
</style>
