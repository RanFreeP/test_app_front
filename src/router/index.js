import HomeView from '../views/HomeView.vue'

// import middleware from "@/router/middleware";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
