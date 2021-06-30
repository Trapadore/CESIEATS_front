<template>
  <div id="profil-modifying" v-if="modifying">
    <h1>Votre profil</h1>
    <v-card>
      <v-card-title>Modifier votre profil</v-card-title>
      <v-card-text>
        <v-text-field
          solo
          label="Prénom"
          clearable
          :value="identity? identity.firstName : null"
        ></v-text-field>
        <v-text-field
          solo
          label="Nom"
          clearable
          :value="identity? identity.lastName : null"
        ></v-text-field>
        <v-radio-group row mandatory>
          <v-radio label="Homme" value="0"> </v-radio>
          <v-radio label="Femme" value="1"></v-radio>
          <v-radio label="Autre" value="2"></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="modify"
        >
          Valider les modifications
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <div v-else id="profil-static">
    <h1>Votre profil</h1>
    <v-card>
      <v-card-title>Nom Prénom</v-card-title>
      <v-card-text>
        <p style="color: #222222">Homme</p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="modify"
        >
          Modifier
        </v-btn>
      </v-card-actions>
    </v-card></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    modifying: false,
  }),
  methods: {
    modify () {
      if (this.modifying) {
        //TODO popup pour dire "sur de vouloir modifier
        this.modifying = false;
      } else {
        this.modifying = true;
      }
    },
    computed: {
      ...mapState(['identity']),
    },
  },
}
</script>
