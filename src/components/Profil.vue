<template>
    <div id="profil-modifying">
        <div v-if="modifying">
            <h1>Votre profil</h1>
            <v-card>
                <v-card-title>Modifier votre profil</v-card-title>
                <v-card-text>
                    <v-text-field solo label="Nom" clearable v-model="name"></v-text-field>
                    <v-text-field solo label="Address" clearable v-model="address"></v-text-field>
                    <v-text-field v-model="email" solo label="Mail" clearable type="email"></v-text-field>
                    <v-text-field solo label="Mot de passe" clearable type="password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="modify"> Valider les modifications </v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <div v-else id="profil-static">
            <h1>Votre profil</h1>
            <v-card>
                <v-card-title>{{ name }}</v-card-title>
                <v-card-text>
                    <p style="color: #222222">{{ email }}</p>
                    <p style="color: #222222">{{ address }}</p>
                    <p style="color: #222222">Mot de passe</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="modify"> Modifier </v-btn>
                    <v-spacer />
                    <v-btn color="error" @click="deleteUser">Supprimer mon compte sans confirmation</v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <div style="margin-top: 20px">
            <v-card>
                <v-card-title>Parrainer</v-card-title>
                <v-card-text>
                    <v-text-field solo label="mail du filleul" clearable v-model="sponsorEmail"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="sponsor"> Parrainer </v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Fermer </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data: () => ({
        modifying: false,
        name: "",
        email: "",
        address: "",
        snackbar: false,
        timeout: 4000,
        text: "",
        sponsorEmail: "",
    }),
    methods: {
        modify() {
            if (this.modifying) {
                //TODO popup pour dire "sur de vouloir modifier"
                //TODO envoyer les données à l'api
                var axios = require("axios");
                var data = JSON.stringify({
                    email: this.email,
                    name: this.name,
                    picture: JSON.parse(localStorage.user).picture,
                    address: this.address,
                });

                var config = {
                    method: "put",
                    url: "http://localhost:9000/users/" + JSON.parse(localStorage.user).id,
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                        "Content-Type": "application/json",
                    },

                    data: data,
                };

                axios(config)
                    .then((response) => {
                        let storage = JSON.parse(localStorage.user);
                        storage.name = response.data.name;
                        storage.email = response.data.email;
                        storage.address = response.data.address;
                        storage = JSON.stringify(storage);
                        localStorage.user = storage;

                        this.text = "Votre profil a bien été modifié";
                        this.snackbar = true;
                    })
                    .catch(function (error) {
                        this.text = "Erreur lors de la modification de votre profil : " + error;
                        this.snackbar = true;
                        console.log(error);
                    });
                this.modifying = false;
            } else {
                this.modifying = true;
            }
        },
        sponsor() {
            var axios = require("axios");
            var data = JSON.stringify({
                email: this.email,
                name: this.name,
                picture: JSON.parse(localStorage.user).picture,
                address: this.address,
                sponsor: this.sponsorEmail,
            });

            var config = {
                method: "put",
                url: "http://localhost:9000/users/" + JSON.parse(localStorage.user).id,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                    "Content-Type": "application/json",
                },

                data: data,
            };

            axios(config)
                .then(() => {
                    this.sponsorEmail = "";

                    this.text = "Votre filleul à bien été parrainé";
                    this.snackbar = true;
                })
                .catch(function (error) {
                    this.text = "Erreur lors du parrainage : " + error;
                    this.snackbar = true;
                    console.log(error);
                });
            this.modifying = false;
        },
        deleteUser() {
            var axios = require("axios");
            var data = "";

            var config = {
                method: "delete",
                url: "http://localhost:9000/users/" + JSON.parse(localStorage.user).id,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
                },
                data: data,
            };

            axios(config)
                .then(() => {
                    delete localStorage.user;
                    delete document.cookie;
                    this.$router.push("/");
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    created() {
        this.name = JSON.parse(localStorage.user).name;
        this.email = JSON.parse(localStorage.user).email;
        this.address = JSON.parse(localStorage.user).address;
    },
    watch: {
        name: function (val) {
            JSON.parse(localStorage.user).name = val;
        },
        address: function (val) {
            JSON.parse(localStorage.user).address = val;
        },
        email: function (val) {
            JSON.parse(localStorage.user).email = val;
        },
    },
};
</script>
