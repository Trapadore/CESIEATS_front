<template>
  <div class="rCard">
    <v-container>
      <v-row>
        <v-col>
          <v-hover v-slot="{ hover }">
            <v-card
              :to="'/restaurants/' + id"
              :dark="darkTheme"
              v-bind:style="[hover ? hovered : unhovered]"
            >
              <v-card-title> {{ title }}</v-card-title>
              <v-row>
                <v-col class="pa-10">
                  <img
                    src="../assets/box-for-two.jpg"
                    alt="Girl in a jacket"
                    width="250px"
                  />
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
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",
  data() {
    return {
      darkTheme: true,
      unhovered: { border: "2px solid #333333" },
      hovered: { border: "2px solid #D79A10" },
    };
  },
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
      default: "Titre",
    },
    description: {
      type: String,
      default: "Description du Restaurant",
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
