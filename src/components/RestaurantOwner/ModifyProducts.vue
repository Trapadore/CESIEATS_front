<template>
  <v-row>
    <div v-for="article in articles" :key="article.id">
      <ModifyProductCard />
    </div>
  </v-row>
</template>

<script>
import ModifyProductCard from "./ModifyProductCard";

export default {
  data: () => ({
    articles: [
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
  components: { ModifyProductCard },
};
</script>
