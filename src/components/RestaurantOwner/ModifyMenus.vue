<template>
    <v-row>
        <div v-for="menu in menus" :key="menu.id">
            <ModifyMenuCard />
        </div>
        <PlusCard/>
    </v-row>
</template>

<script>
import ModifyMenuCard from "./ModifyMenuCard";
import PlusCard from "./PlusCard";

export default {
    data: () => ({
        menus: [
            {
                id: 1,
                name: "Cafe",
                description: "Description d'un café",
                price: 1.0,
                type: "drink",
            },
            {
                id: 2,
                name: "Soupe",
                description: "Description d'une soupe",
                price: 3.0,
                type: "appetizer",
            },
            {
                id: 3,
                name: "Pâtes",
                description: "Description des pâtes",
                price: 9.0,
                type: "mainCourse",
            },
        ],
    }),
    components: { ModifyMenuCard, PlusCard },
};
</script>
