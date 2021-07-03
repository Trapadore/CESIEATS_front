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
                            height="349"

                        >
                            <v-card-text>
                                <v-icon @click="reveal = true" x-large style="height: 250px">mdi-hospital</v-icon>
                            </v-card-text>
                            <v-expand-transition>
                              <v-card
                                  v-if="reveal"
                                  class="transition-fast-in-fast-out v-card--reveal"
                                  style="height: 100%"
                              >
                                <v-card-text>
                                  <v-text-field solo label="Nom produit" clearable v-model="name"></v-text-field>
                                  <v-text-field solo label="Image produit" clearable v-model="image"></v-text-field>
                                  <v-text-field solo label="Prix produit" clearable v-model="price"></v-text-field>
                                  <v-text-field solo label="Type produit" clearable v-model="productType"></v-text-field>
                                </v-card-text>
                                <v-card-actions class="pt-0">
                                  <v-btn color="secondary" @click="save">Sauvegarder</v-btn>
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
    name: "Product  Card",
    data() {
        return {
          name:"",
          price:"",
          productType:"",
          reveal: false,
          darkTheme: true,
          unhovered: { border: "2px solid #333333" },
          hovered: { border: "2px solid #D79A10" },
          source: "data:image/jpeg;base64," + this.image,
        };
    },
    props: {
        id: {
            type: String,
        },
        title: {
            type: String,
            default: "Titre",
        },
        image: {
            type: String,
        },
        restaurant:{
            type:Object
        }
    },
    methods: {
      save(){
        var axios = require('axios');
        var data = JSON.stringify({
          "name": this.name,
          "price": this.price,
          "image": this.image,
          "productType": this.productType,
          "restaurantId": this.restaurant._id
        });
        var config = {
          method: 'post',
          url: 'http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/products/',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNTAzOTQ1OH0.3kbYJEZeYu6qPHVurBxwSyeWMcunt5hvU1wyDSIErqI',
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
            .then(function () {
              // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });

        this.reveal = false
      },
    },
};
</script>

<style lang="scss">
h3 {
    text-align: justify;
    text-justify: inter-word;
}

.icon {
    font-size: 50px;
}
</style>
