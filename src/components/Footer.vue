<template>
    <v-footer color="#000000" padless>
        <v-row justify="center" no-gutters>
            <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
                {{ link }}
            </v-btn>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: ["About Us", "Team", "Services", "Blog", "Contact Us"],
    }),
};
</script>
