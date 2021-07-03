<template>
    <div class="rCard">
        <v-container>
            <v-row>
                <v-col>
                    <v-hover v-slot="{ hover }">
                        <v-card :dark="darkTheme" v-bind:style="[hover ? hovered : unhovered]" width="250px">
                            <v-card-title>
                                {{ title }}
                                <v-spacer />
                                <v-select
                                    :items="items"
                                    label="Quantité"
                                    @change="emitQuantity()"
                                    v-model="value"
                                ></v-select>
                            </v-card-title>
                            <img :src="'data:image/jpeg;base64,' + image" alt="Girl in a jacket" width="100%" />
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Product  Card",
    data() {
        return {
            value: 0,
            items: [0, 1, 2, 3, 4, 5],
            darkTheme: true,
            unhovered: { border: "2px solid #333333" },
            hovered: { border: "2px solid #D79A10" },
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
        image: {
            type: String,
        },
        price: {
            type: Number,
        },
        restaurantId: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    methods: {
        emitQuantity() {
            var emitValue = {
                id: this.id,
                name: this.title,
                quantity: this.value,
                image: this.image,
                price: this.price,
                restaurantId: this.restaurantId,
                type: this.type,
            };
            this.$emit("selected", emitValue);
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
