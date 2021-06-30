<template>
  <div id="cart">
    <h1 v-if="!hasArticle">Vous n'avez pas de commande en cours</h1>
    <template v-else>
      <v-row>
        <v-col>
          <h1>Panier ({{ count }} produits)</h1>
          <v-card
            v-for="article in articles"
            :key="article.id"
            style="margin-top: 30px"
          >
            <v-card-text>
              <v-row>
                <v-col align-self="start"> Photo article</v-col>
                <v-col>
                  <h1>{{ article.name }}</h1>
                  {{ article.description }}
                </v-col>
                <v-col align-self="end">
                  {{ article.price }} €
                  <v-select
                    :items="items"
                    label="Quantité"
                    dense
                    solo
                    style="max-width: 200px"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4">
          <h1>Récapitulatif</h1>
          <v-card style="margin-top: 30px">
            <v-card-text>
              <b>Un code promo ?</b>
              <v-text-field
                solo
                label="Écrivez le ici"
              ></v-text-field>
              <v-btn dark>Valider</v-btn>
            </v-card-text>
          </v-card>
          <v-card style="margin-top: 30px">
            <v-card-text>
              Panier ({{ count }}) 700,00€
              Frais de livraisons 4,00€
              <b>Total</b> (tva incluse) 704,00€
              <v-btn dark>Valider mon panier</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    hasArticle: true,
    count: 0,
    items: [1, 2, 3, 4, 5],
    articles: [
      {
        id: 1,
        name: "Chaussettes",
        description: "Ce sont de belles chaussettes nan ?",
        price: 2,
        quantity: 1
      },
      {
        id: 2,
        name: "Chaussures",
        description: "Ce sont de belles chaussures nan ?",
        price: 40,
        quantity: 1
      },
      {
        id: 3,
        name: "Sandales",
        description: "Ce sont de belles sandales nan ?",
        price: 20,
        quantity: 1
      }
    ]
  })
};
</script>
