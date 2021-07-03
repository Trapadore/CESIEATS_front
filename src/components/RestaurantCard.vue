<template>
    <div class="rCard">
        <v-container>
            <v-row>
                <v-col>
                    <v-hover v-slot="{ hover }">
                        <v-card @click="goToRestaurant" :dark="darkTheme" v-bind:style="[hover ? hovered : unhovered]">
                            <v-card-title> {{ title }}</v-card-title>
                            <v-row>
                                <v-col class="pa-10">
                                    <img :src="source" alt="Girl in a jacket" width="250px" />
                                </v-col>
                                <v-col class="pa-10" justify="center" align-self="center">
                                    <H3> {{ description }} </H3>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "RestaurantCard",
    data() {
        return {
            snackbar: false,
            timeout: 4000,
            text: "Vous avez des produits d'un autre restaurant dans votre panier actuel, terminez cette commande ou supprimez les produits avant de changer de restaurant",
            darkTheme: true,
            unhovered: { border: "2px solid #333333" },
            hovered: { border: "2px solid #D79A10" },
            source: "data:image/jpeg;base64," + this.image,
        };
    },
    props: {
        id: {
            type: String,
        },
        title: {
            type: String,
            default: "Titre",
        },
        description: {
            type: String,
            default: "Description du Restaurant",
        },
        image: {
            type: String,
        },
    },
    created() {},
    methods: {
        goToRestaurant() {
            if (localStorage.cart !== undefined) {
                if (localStorage.cart.length != 0) {
                    let idCart = JSON.parse(localStorage.cart)[0].restaurantId;
                    if (this.id === idCart) {
                        this.$router.push("/restaurants/" + this.id);
                    } else {
                        this.snackbar = true;
                    }
                } else {
                    this.$router.push("/restaurants/" + this.id);
                }
            } else {
                this.$router.push("/restaurants/" + this.id);
            }
        },
    },
};
</script>

<style lang="scss">
h3 {
    text-align: justify;
    text-justify: inter-word;
}
</style>
