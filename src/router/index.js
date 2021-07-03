import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ClientView from "../views/ClientView.vue";
import Restaurants from "../views/Restaurants.vue";
import Product from "../views/Products.vue";
import RestaurantOwnerView from "../views/RestaurantOwnerView";
import DelivererView from "../views/DelivererView";
import RestaurantMenus from "../views/RestaurantMenus";
import BusinessView from "../views/BusinessView";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/compte",
        name: "ClientView",
        component: ClientView,
    },
    {
        path: "/compte/:menu",
        name: "Account",
        component: ClientView,
    },
    {
        path: "/myrestaurant",
        name: "RestaurantOwnerView",
        component: RestaurantOwnerView,
    },
    {
        path: "/restaurants",
        name: "Restaurants",
        component: Restaurants,
    },
    {
        path: "/restaurants/:id",
        name: "RestaurantMenus",
        component: RestaurantMenus,
    },
    {
        path: "/restaurants/products/:id&:name",
        name: "RestaurantProducts",
        component: Product,
    },
    {
        path: "/products",
        name: "Product",
        component: Product,
    },
    {
        path: "/livraisons",
        name: "DelivererView",
        component: DelivererView,
    },
    {
        path: "/commercial",
        name: "BusinessView",
        component: BusinessView,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
