import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import Restaurants from "../views/Restaurants.vue";
import Product from "../views/Products.vue";
import MyRestaurant from "../views/MyRestaurant";
import Deliveries from "../views/Deliveries";
import RestaurantMenus from "../views/RestaurantMenus";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/compte",
    name: "Account",
    component: Account,
  },
  {
    path: "/myrestaurant",
    name: "MyRestaurant",
    component: MyRestaurant,
  },
  {
    path: "/restaurants",
    name: "Restaurants",
    component: Restaurants,
  },
  {
    path: "/restaurants/:id",
    name: "Restaurant",
    component: RestaurantMenus,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
  },
  {
    path: "/livraisons",
    name: "Deliveries",
    component: Deliveries,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
