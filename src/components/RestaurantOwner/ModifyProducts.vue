<template>
    <v-row>
      <div v-if="loaded">
        <v-row>
          <div v-for="article in articles" :key="article.id" >
            <ModifyProductCard :product="article" @deleteProduct="spliceArticles"/>
          </div>
          <PlusCard :restaurant="restaurant"/>
        </v-row>
      </div>
      <div v-else>
        <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
        ></v-progress-circular>
      </div>
    </v-row>
</template>

<script>
import ModifyProductCard from "./ModifyProductCard";
import PlusCard from "./PlusCard";

export default {
    data: () => ({
      change:false,
      loaded : false,
      restaurant:"",
      articles : []
    }),
  created: function(){
    console.log(JSON.parse(localStorage.user).id)
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({});
    var config1 = {
      method: "get",
      url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/restaurants/owner/"+JSON.parse(localStorage.user).id,
      headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
      },
      data: data,
    };
    axios(config1)
        .then((response) => {
          this.restaurant = response.data[0];
          console.log(this.restaurant)
        })
        .catch(function (error) {
          console.log(error);
        });

  },
  methods:{
    spliceArticles(val){
      this.articles.splice(val, 1);
    }
  },
  watch: {
    restaurant: function(val){
      console.log(val._id)
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config2 = {
        method: "get",
        url: "http://cesieats-api-vazvi-dev.apps.sandbox.x8i5.p1.openshiftapps.com/products/byrestaurant/"+val._id,
        headers: {
          Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDliYmExZGZjZWNkOGQ3YzNkNjljZiIsImlhdCI6MTYyNDg4NjY4NX0.WH3i950TXrd_9mmPeT9KxaVlNKFgAhlJHtZxH-Fhqoo",
        },
        data: data,
      };
      axios(config2)
          .then((response) => {
            console.log(response.data);
            let i = 0;
            response.data.forEach((products)=>{
              this.articles.push({...products,'id':i})
              i++
            })
            this.loaded = true
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  components: { ModifyProductCard, PlusCard },
};
</script>
