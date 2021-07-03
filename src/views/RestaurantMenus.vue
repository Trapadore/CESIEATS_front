<template>
    <div class="d-flex flex-wrap p-2 col-example" style="flex-wrap wrap">
        <div v-for="entity in entities" :key="entity._id">
            <Entity :id="entity.restaurantId" :title="entity.name" :image="entity.image"> </Entity>
        </div>
    </div>
</template>

<script>
import Entity from "../components/EntityCard.vue";
export default {
    name: "RestaurantMenus",
    components: {
        Entity,
    },
    data() {
        return {
            entities: [],
            menus: [],
            products: [],
        };
    },
    created: function () {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({});
        var config = {
            method: "get",
            url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/menus/byrestaurant/" + this.$route.params.id,
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
            },
            data: data,
        };
        axios(config)
            .then((response) => {
                this.menus = response.data;
                if (response.data.length != 0) {
                    response.data[0].name = "Menus";
                    this.entities.push(response.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        data = qs.stringify({});
        config = {
            method: "get",
            url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/products/byrestaurant/" + this.$route.params.id,
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
            },
            data: data,
        };
        axios(config)
            .then((response) => {
                this.products = response.data;
                this.entities = this.entities.concat(this.findAllEntities(this.products));
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        findAllEntities(products) {
            var entities = [];
            for (var i = 0; i < products.length; i++) {
                if (entities.find(({ productType }) => productType === products[i].productType) === undefined) {
                    products[i].name = products[i].productType;
                    entities.push(products[i]);
                }
            }
            return entities;
        },
    },
};
</script>

<style lang="scss">
body {
    background-color: #222222;
}
</style>
