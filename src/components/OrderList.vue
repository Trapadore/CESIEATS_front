<template>
    <div>
        <v-row>
            <v-col>{{ product.name }}</v-col>
            <v-divider vertical></v-divider>
            <v-col>{{ product.price }}</v-col>
            <v-divider vertical></v-divider>
            <v-col>{{ product.quantity }}</v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data: () => ({
        test: "ok",
    }),
    props: {
        product: {
            type: Object,
        },
    },
    created() {},
};
</script>
