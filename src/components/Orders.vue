<template>
  <div id="orders">
    <h1>Commandes</h1>
    <v-card v-for="order in orders" :key="order.commandNumber" style="margin-top: 30px">
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              {{ order.type }}
            </v-row>
            <v-row>
              Image de la commande
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
                {{ order.date }}
              </v-col>
              <v-col align-self="center">
                <v-icon>mdi-package-variant</v-icon>
              </v-col>
              <v-col>
                <b>Numéro de commande</b>
                {{ order.commandNumber }}
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-btn dark>
                Détails de la commande
              </v-btn>
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
    orders: [
      {
        type: "Commande retirée en magasin",
        date: "26/06/2021",
        commandNumber: 122233335
      },
      {
        type: "Commande livrée",
        date: "25/06/2021",
        commandNumber: 654289
      },
      {
        type: "Commande annulée",
        date: "21/06/2021",
        commandNumber: 87972
      }
    ]
  })
};
</script>
