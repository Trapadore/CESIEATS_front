<template>
    <div class="rCard">
        <v-container>
            <v-row>
                <v-col>
                    <v-hover v-slot="{ hover }">
                        <v-card
                            :dark="darkTheme"
                            v-bind:style="[hover ? hovered : unhovered]"
                            width="250px"
                            :to="'/restaurants/products/' + id + '&' + title"
                        >
                            <v-card-title>
                                {{ title }}
                                <v-spacer />
                            </v-card-title>
                            <img :src="source" alt="Girl in a jacket" width="100%" />
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
        image: {
            type: String,
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
