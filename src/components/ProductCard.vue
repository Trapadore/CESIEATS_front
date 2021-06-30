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
            >
              <v-card-title>
                Cafe Badilico
                <v-spacer />
                <v-checkbox
                  color="success"
                  class="checkbox-round"
                ></v-checkbox>
              </v-card-title>
              <img
                src="../assets/poke-bowl.png"
                alt="Girl in a jacket"
                width="100%"
              />
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
    };
  },
};
</script>

<style lang="scss">
h3 {
  text-align: justify;
  text-justify: inter-word;
}
</style>
