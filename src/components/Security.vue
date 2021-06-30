<template>
  <div id="security">
    <h1>Sécurité</h1>
    <v-card v-if="modifying">
      <v-card-title>Modifier votre profil</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="message2"
          solo
          label="Mail"
          clearable
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="message2"
          solo
          label="Mot de passe"
          clearable
          type="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="modify">
          Valider les modifications
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
      <v-card-title>Nom Prénom</v-card-title>
      <v-card-text>
        <p style="color: #222222">mail</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="modify">
          Modifier
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    modifying: false,
  }),
  methods: {
    modify() {
      if (this.modifying) {
        //TODO popup pour dire "sur de vouloir modifier
        this.modifying = false;
      } else {
        this.modifying = true;
      }
    },
  },
};
</script>
