<template>
  <v-row style="height: 100%">
    <v-col md="auto">
      <v-navigation-drawer v-model="drawer" dark style="height: 100%">
        <v-sheet color="#2a2a2a" class="pa-4">
          <v-avatar class="mb-4" color="blue" size="64"></v-avatar>

          <div>Nom du restaurant</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="[icon, text] in links"
            :key="text"
            link
            @click="clickList(text)"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-col>
    <v-col>
      <v-container>
        <ModifyProducts v-if="menu === 'Articles'" />
        <ModifyMenus v-if="menu === 'Menus'" />
        <PastOrders v-if="menu === 'Commandes passées'" />
        <OrdersinProcess v-if="menu === 'Commandes en cours'" />
        <Statistics v-if="menu === 'Statistiques'" />
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import OrdersinProcess from "../components/RestaurantOwner/OrdersinProcess";
import PastOrders from "../components/RestaurantOwner/PastOrders";
import Statistics from "../components/RestaurantOwner/Statistics";
import ModifyProducts from "../components/RestaurantOwner/ModifyProducts";
import ModifyMenus from "../components/RestaurantOwner/ModifyMenus";

export default {
  components: {
    ModifyMenus,
    ModifyProducts,
    Statistics,
    PastOrders,
    OrdersinProcess,
  },
  data: () => ({
    drawer: null,
    links: [
      ["mdi-food", "Articles"],
      ["mdi-silverware", "Menus"],
      ["mdi-basket", "Commandes passées"],
      ["mdi-cart", "Commandes en cours"],
      ["mdi-equalizer", "Statistiques"],
    ],
    menu: "Commandes en cours",
  }),
  methods: {
    clickList(key) {
      this.menu = key;
      console.log(this.menu);
    },
    computed: {
      ...mapState(["identity"]),
      //TODO does not work
    },
  },
};
</script>
