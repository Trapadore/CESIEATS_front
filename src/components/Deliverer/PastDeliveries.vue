<template>
  <div id="orders">
    <h1>Commandes passées</h1>
    <v-card
      v-for="order in orders"
      :key="order.commandNumber"
      style="margin-top: 30px"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <h2>{{ order.type }} ({{ order.total.toFixed(2) }}€)</h2>
            </v-row>
            <v-row>
              <v-list>
                <v-list-item v-for="article in order.content" :key="article.id">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="article.type + ' id: ' + article.id"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-row>
          </v-col>
          <v-spacer />
          <v-col align-self="center">
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
        type: "Commande livrée",
        date: "26/06/2021",
        commandNumber: 122233335,
        total: 12.0,
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
        type: "Commande emportée",
        date: "26/06/2021",
        commandNumber: 654289,
        total: 32.0,
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
        type: "Commande livrée",
        date: "26/06/2021",
        commandNumber: 87972,
        total: 25.0,
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
