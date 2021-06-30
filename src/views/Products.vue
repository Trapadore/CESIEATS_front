

<template>
  <div class="d-flex flex-wrap p-2 col-example" style="flex-wrap wrap">
    <div v-for="restaurant in table" :key="restaurant">
      <Product></Product>
    </div>
    <h1>This is the product page</h1>
  </div>
</template>

<script>
import Product from "../components/ProductCard.vue";
export default {
  name: "App",
  components: {
    Product,
  },
  data() {
    return {
      table: [1, 2, 4, 7],
    };
  },
};
</script>

<style lang="scss">
body {
  background-color: #222222;
}
</style>
