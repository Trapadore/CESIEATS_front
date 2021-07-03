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
                            class="mx-auto"
                            max-width="250px"
                        >
                            <v-card-title>{{product.name}}</v-card-title>
                            <v-card-text>
                                <img :src="product.image" alt="Girl in a jacket" width="100%" />
                            </v-card-text>

                            <v-card-actions class="pt-0">
                                <v-btn color="secondary" @click="reveal = true">Modifier</v-btn>
                                <v-btn color="error" @click="deleteProduct">Supprimer</v-btn>
                            </v-card-actions>

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
    data: () => ({
      name:"",
      price:"",
      image:"",
      reveal: false,
      darkTheme: true,
      unhovered: { border: "2px solid #333333" },
      hovered: { border: "2px solid #D79A10" },
    }),
  mounted(){
    this.name=this.product.name
    this.price=this.product.price
    this.image=this.product.image
  },
  methods:{
      save(){
        // console.log(this.product._id)
        var axios = require('axios');
        var data = JSON.stringify({
          "name": this.name,
          "price": this.price,
          "image": this.image,
          "productType": this.product.productType,
          "restaurantId": this.product.restaurantId
        });

        var config = {
          method: 'put',
          url: 'http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/products/'+ this.product._id,
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNTAzOTQ1OH0.3kbYJEZeYu6qPHVurBxwSyeWMcunt5hvU1wyDSIErqI',
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });

        this.reveal = false
      },
      deleteProduct(){
        var axios = require('axios');
        var data = JSON.stringify({
        });

        var config = {
          method: 'delete',
          url: 'http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/products/'+ this.product._id,
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNTAzOTQ1OH0.3kbYJEZeYu6qPHVurBxwSyeWMcunt5hvU1wyDSIErqI',
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
        this.reveal = false
        this.$emit("deleteProduct", this.product.id);
      }
  },
  props: {
    product : {
      type: Object
    },
    restaurant:{
      type:Object
    }
  }
};
</script>

<style lang="scss">
h3 {
    text-align: justify;
    text-justify: inter-word;
}
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>
