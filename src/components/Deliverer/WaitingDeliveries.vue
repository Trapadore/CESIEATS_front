<template>
  <div id="orders">
    <h1>Livraisons en attente</h1>
    <v-card
      v-for="delivery in deliveries"
      :key="delivery.commandNumber"
      style="margin-top: 30px"
    >
      <v-card-text>
        <v-row>
          <v-col lg="6">
            <v-row>
              <h2>{{ delivery.client }}</h2>
            </v-row>
            <v-row>
              <v-list>
                <v-list-item>
                  Adresse de départ: {{ delivery.restaurantAddress }}
                </v-list-item>
                <v-list-item>
                  Adresse de livraison : {{ delivery.clientAddress }}
                </v-list-item>
              </v-list>
            </v-row>
          </v-col>
          <v-spacer />
          <v-col align="center">
            <v-row no-gutters justify="end">
              <v-col align-self="center">
                <v-icon>mdi-calendar</v-icon>
              </v-col>
              <v-col>
                <b>Date de commande</b>
                {{ delivery.date }}
              </v-col>
              <v-col align-self="center">
                <v-icon>mdi-package-variant</v-icon>
              </v-col>
              <v-col>
                <b>Numéro de commande</b>
                {{ delivery.commandNumber }}
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-btn color="success" style="margin-right: 30px">
                Accepter
              </v-btn>
              <v-btn color="error" style="margin-right: 30px"> Refuser</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    deliveries: [
      {
        clientAddress: "1 allée du titane, 45100 Orléans",
        restaurantAddress: "BK",
        client: "Marjolet Louis",
        date: "26/06/2021",
        commandNumber: 122233335,
        content: [
          {
            type: "menu",
            id: 1,
            quantity: 1,
          },
          {
            type: "article",
            id: 3,
            quantity: 2,
          },
        ],
      },
      {
        clientAddress: "1 allée du titane, 45100 Orléans",
        restaurantAddress: "BK",
        client: "Vaz Vicente",
        date: "26/06/2021",
        commandNumber: 654289,
        content: [
          {
            type: "menu",
            id: 1,
            quantity: 1,
          },
          {
            type: "article",
            id: 3,
            quantity: 2,
          },
        ],
      },
      {
        clientAddress: "1 allée du titane, 45100 Orléans",
        restaurantAddress: "BK",
        client: "Le Gall Bastien",
        date: "26/06/2021",
        commandNumber: 87972,
        content: [
          {
            type: "menu",
            id: 1,
            quantity: 1,
          },
          {
            type: "article",
            id: 3,
            quantity: 2,
          },
        ],
      },
    ],
  }),
};
</script>
