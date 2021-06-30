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
              class="mx-auto"
              max-width="250px"
            >
              <v-card-title>Cafe Badilico</v-card-title>
              <v-card-text>
                <img
                  src="../../assets/poke-bowl.png"
                  alt="Girl in a jacket"
                  width="100%"
                />
              </v-card-text>

              <v-card-actions class="pt-0">
                <v-btn color="secondary" @click="reveal = true">Modifier</v-btn>
                <v-btn color="error" @click="deleteItem">Supprimer</v-btn>
              </v-card-actions>

              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%"
                >
                  <v-card-text>
                    <v-text-field
                      solo
                      label="Nom produit"
                      clearable
                    ></v-text-field>
                    <p>Photo du produit</p>
                    <v-text-field
                      solo
                      label="Prix produit"
                      clearable
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-btn color="secondary" @click="reveal = false">Sauvegarder</v-btn>
                    <v-btn color="error" @click="reveal = false">Annuler</v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    reveal: false,
    darkTheme: true,
    unhovered: { border: "2px solid #333333" },
    hovered: { border: "2px solid #D79A10" }
  })
};
</script>

<style lang="scss">
h3 {
  text-align: justify;
  text-justify: inter-word;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
