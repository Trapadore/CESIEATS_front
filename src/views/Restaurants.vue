<template>
    <div class="restaurant">
        <div v-for="restaurant in restaurants" :key="restaurant.id">
            <Restaurant
                :id="restaurant.id"
                :title="restaurant.name"
                :description="restaurant.description"
                :image="restaurant.image"
            />
        </div>
    </div>
</template>

<script>
import Restaurant from "../components/RestaurantCard.vue";

export default {
    name: "Restaurants",
    components: {
        Restaurant,
    },
    data() {
        return {
            restaurants: null,
        };
    },
    created: function () {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({});
        var config = {
            method: "get",
            url: "http://localhost:9000/restaurants",
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
    },
};
</script>

<style lang="scss">
body {
    background-color: #222222;
}
</style>
