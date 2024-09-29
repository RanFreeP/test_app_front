import HomeView from '../views/HomeView.vue'
import BrandView from '../views/Brand.vue'

import middleware from "@/router/middleware";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/brand/:brandId',
    name: 'brand',
    component: BrandView,
    beforeEnter: middleware.user,
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
