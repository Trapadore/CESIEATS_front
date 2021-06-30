<template>
  <div class="restaurant">
    <div v-for="restaurant in restaurants" :key="restaurant">
      <Restaurant
        :id="restaurant.id"
        :title="restaurant.title"
        :description="restaurant.description"
      />
    </div>
    <h1>This is the restaurant page</h1>
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
      restaurants: [
        {
          id: 1,
          title: "Cafe badillico",
          description:
            "Le meilleur restaurant cannibal de la ville, des plats\n" +
            "d'exception proposé par le chef Hannibal. Langue et sa sauce\n" +
            "au vin rouge, cuisse à l'ail et fratin dauphinois aux\n" +
            "truffes",
        },
        {
          id: 2,
          title: "Cafe turque",
          description:
            "Le meilleur restaurant cannibal de la ville, des plats\n" +
            "d'exception proposé par le chef Hannibal. Langue et sa sauce\n" +
            "au vin rouge, cuisse à l'ail et fratin dauphinois aux\n" +
            "truffes",
        },
        {
          id: 3,
          title: "Cafe francais",
          description:
            "Le meilleur restaurant cannibal de la ville, des plats\n" +
            "d'exception proposé par le chef Hannibal. Langue et sa sauce\n" +
            "au vin rouge, cuisse à l'ail et fratin dauphinois aux\n" +
            "truffes",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
body {
  background-color: #222222;
}
</style>
