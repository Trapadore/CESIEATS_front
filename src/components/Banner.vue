<template>
  <v-app-bar app color="#000000" dark>
    <v-btn icon to="/">
      <v-img width="60" src="../assets/Cesi_Eats_logo.jpg" />
    </v-btn>

    <v-spacer />
    <router-link to="/restaurants" class="link"> Restaurants </router-link>
    <v-spacer />
    <v-text-field
      hide-details
      prepend-icon="mdi-magnify"
      single-line
    ></v-text-field>
    <v-spacer />
    <v-btn icon to="/compte">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-spacer/>
    <PopUpConnect />
  </v-app-bar>
</template>

<script>
import PopUpConnect from "./PopUpConnect";

export default {
  components: {
    PopUpConnect,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss">
a {
  color: #dcc55e;
}
</style>
