<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="60%">
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn v-if="!logged" :key="logged" dark @click="cookie()"> Cookie</v-btn> -->
        <div v-if="logged" :key="logged" ><v-btn dark @click="disconnect()" v-bind="attrs" v-on="on"> Deconnexion</v-btn></div>
        <div v-if="notLogged" :key="notLogged" ><v-btn dark v-bind="attrs" v-on="on"> Connexion</v-btn></div>
      </template>

      <div align="center">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">
                      Connectez vous sur CesiEats
                    </h1>
                    <subtitle-1
                      v-if="accountCreated == true"
                      class="text-center green--text"
                    >
                      Votre compte a bien été créé
                    </subtitle-1>
                    <v-form>
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        type="text"
                        color="teal accent-3"
                        v-model="email"
                        :rules="emailRules"
                      />

                      <v-text-field
                        id="password"
                        label="Mot de Passe"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                        v-model="password"
                        :rules="passwordRules"
                      />
                    </v-form>
                    <h3 class="text-center mt-4">Mot de passe oublié ?</h3>
                    <div class="text-center mt-3">
                      <v-btn rounded color="teal accent-3" dark @click="logIn()"
                        >Se connecter
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Bonjour!</h1>
                    <h5 class="text-center">
                      Entrer vos données personnelles et commencez votre
                      aventure à nos côtés
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++"
                      >S'inscrire
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Bon retour!</h1>
                    <h5 class="text-center">
                      Pour vous connecter veuillez entrer vos informations
                      personnelles
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--"
                      >Se connecter
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">
                      Créer un compte
                    </h1>
                    <subtitle-1 v-if="emailError==true" class="text-center red--text">
                      Cet adresse mail est déjà utilisée
                    </subtitle-1>
                    <v-form ref="signin" v-model="valid" lazy-validation>
                      <v-text-field
                        label="Nom"
                        name="Name"
                        prepend-icon="person"
                        type="text"
                        color="teal accent-3"
                        v-model="username"
                        :rules="usernameRules"
                      />
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        type="text"
                        color="teal accent-3"
                        v-model="email"
                        :rules="emailRules"
                      />

                      <v-text-field
                        id="password"
                        label="Mot de passe"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                        v-model="password"
                        :rules="passwordRules"
                      />
                      <v-select
                        :items="accountType"
                        label="Type de compte"
                        solo
                        v-model="accountType[0]"
                      ></v-select>
                    </v-form>
                    <div class="text-center mt-n5">
                      <v-btn rounded color="teal accent-3" dark @click="signIn()">S'inscrire</v-btn>
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
    import { Base64 } from 'js-base64';
export default {
  data: () => ({
    logged:  false,
    notLogged : true,
    valid: true,
    emailError: false,
    accountCreated: false,
    step: 1,
    accountType: ["client", "livreur", "restaurateur"],
    username: "",
    usernameRules: [
        v => !!v || 'Name is required'
    ],
    email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    password: "",
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be more than 10 characters',
    ]
  }),
  props: {
    source: String,
  },
  created: function () {
    // `this` points to the vm instance
    //this.logged = document.cookie === undefined ? false :this.read_cookie("logged")
  },
  methods: {
    signIn() {
      this.$refs.signin.validate()

      if(this.valid) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("access_token", "MWyj0O79mW9z2bbP72bKGSTto8egmbey");
      urlencoded.append("name", this.name);
      urlencoded.append("email", this.email);
      urlencoded.append("password", this.password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://localhost:9000/users", requestOptions)
        .then(response => { 
          response.text()
          this.step--
          this.accountCreated = true
        })
        .then(result => {
          result = JSON.parse(result)
          if(result.message=="email already registered") {
            this.emailError = true;
          }
          })
        .catch(error => console.log('error', error));
      }
    },
    logIn() {
      var axios = require("axios");
      var qs = require('qs');
      var data = qs.stringify({
        'access_token': 'MWyj0O79mW9z2bbP72bKGSTto8egmbey' 
      });
      var config = {
        method: 'post',
        url: 'http://localhost:9000/auth',
        headers: { 
          'Authorization': "Basic " + Base64.encode(this.email + ":" + this.password), 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        document.cookie = "bearer=" + response.data.token
        document.cookie = "logged=true"
      })
      .catch(function (error) {
        console.log(error);
      });
      this.logged =  document.cookie === undefined ? false : this.read_cookie("logged") === "true" ? true : false
      this.notLogged = !this.logged
      console.log("cookie logged : ", this.read_cookie("logged"))
      console.log("variable logged : ", this.logged)
      console.log("variable notLogged : ", this.notLogged)
    },
    read_cookie(cName) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(cName + '='))
      .split('=')[1];
},
disconnect() {
  console.log("cookie logged avant : ", this.read_cookie("logged"))
      console.log("variable logged avant : ", this.logged)
      console.log("variable notLogged avant : ", this.notLogged)
  document.cookie = "logged=false"
  this.logged =  document.cookie === undefined ? false : this.read_cookie("logged") === "true" ? true : false
  this.notLogged = !this.logged
  console.log("cookie logged après : ", this.read_cookie("logged"))
      console.log("variable logged après : ", this.logged)
      console.log("variable notLogged après : ", this.notLogged)
this.logged =  document.cookie === undefined ? false : this.read_cookie("logged") === "true" ? true : false
  this.notLogged = !this.logged
},
cookie() {
  console.log(document.cookie)
  console.log(document.cookie === undefined ? false :this.read_cookie("logged"))
}
  }
};
</script>
