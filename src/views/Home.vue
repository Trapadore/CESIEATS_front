<template>
  <v-container fill-height>
    <v-row>
      <v-col align-self="center">
        <p class="title">Clients</p>
        <p>Une petite fin ? N'hésitez plus, commandez sur notre site !</p>
      </v-col>
      <v-col align="center">
        <v-img src="../assets/Client.svg" alt="Image Clients" width="50%" />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-img src="../assets/Livreur.svg" alt="Image Clients" width="50%" />
      </v-col>
      <v-col align-self="center">
        <p class="title">Livreurs</p>
        <p>
          Besoin d'un peu d'argent de poche ? Livrez les menus commandés sur la
          plateforme aux clients, rejoignez-nous dès maintenant
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col align-self="center">
        <p class="title">Restaurateurs</p>
        Vous êtes restaurateur, vous souhaitez améliorer votre visibilité et
        votre chiffre d'affaire ? Vous êtes au bon endroit
      </v-col>
      <v-col align="center">
        <v-img
          src="../assets/Restaurateur.svg"
          alt="Image Clients"
          width="50%"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
p {
  color: #ffffff;
}

.title {
  color: #dcc55e;
}
</style>
