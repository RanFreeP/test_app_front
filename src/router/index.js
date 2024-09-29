import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/admin/AdminView'
import UserAll from '../views/admin/UserAll'
import UserId from '../views/admin/UserId'
import BidsInterCity from '../views/admin/bids/BidsInterCity'
import BidsParcels from '../views/admin/bids/BidsParcels'
import BidsCargo from '../views/admin/bids/BidsCargo'
import BidsDeleted from '../views/admin/bids/BidsDeleted'
import DocumentsCarAll from '../views/admin/documentscar/DocumentsCarAll'
import DocumentsCarReviewed from '../views/admin/documentscar/DocumentsCarReviewed'
import DocumentsCarUnReviewed from '../views/admin/documentscar/DocumentsCarUnReviewed'
import ComplaintsAll from '../views/admin/complaints/ComplaintsAll'

import middleware from "@/router/middleware";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: middleware.guest,
  },
  {
    path: '/panel',
    name: 'panel',
    component: AdminView,
    beforeEnter: middleware.user,
  },
  {
    path: '/user_all',
    name: 'user_all',
    component: UserAll,
    beforeEnter: middleware.user,
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: UserId,
    beforeEnter: middleware.user,
    props: true,
  },
  {
    path: '/user_blocked',
    name: 'user_blocked',
    component: AdminView,
    beforeEnter: middleware.user,
  },
  {
    path: '/bids_all',
    name: 'bids_all',
    component: AdminView,
    beforeEnter: middleware.user,
  },
  {
    path: '/documents_all',
    name: 'documents_all',
    component: DocumentsCarAll,
    beforeEnter: middleware.user,
  },
  {
    path: '/documents_user_reviewed',
    name: 'documents_user_reviewed',
    component: DocumentsCarReviewed,
    beforeEnter: middleware.user,
  },
  {
    path: '/documents_user_unreviewed',
    name: 'documents_user_unreviewed',
    component: DocumentsCarUnReviewed,
    beforeEnter: middleware.user,
  },
  {
    path: '/settings',
    name: 'settings',
    component: AdminView,
    beforeEnter: middleware.user,
  },
  {
    path: '/bids_intercity',
    name: 'bids_intercity',
    component: BidsInterCity,
    beforeEnter: middleware.user,
  },
  {
    path: '/bids_parcels',
    name: 'bids_parcels',
    component: BidsParcels,
    beforeEnter: middleware.user,
  },
  {
    path: '/bids_cargo',
    name: 'bids_cargo',
    component: BidsCargo,
    beforeEnter: middleware.user,
  },
  {
    path: '/bids_deleted',
    name: 'bids_deleted',
    component: BidsDeleted,
    beforeEnter: middleware.user,
  },
  {
    path: '/complaints_all',
    name: 'complaints_all',
    component: ComplaintsAll,
    beforeEnter: middleware.user,
  },
  {
    path: '/complaints_reviewed',
    name: 'complaints_reviewed',
    component: BidsDeleted,
    beforeEnter: middleware.user,
  },
  {
    path: '/complaints_unreviewed',
    name: 'complaints_unreviewed',
    component: BidsDeleted,
    beforeEnter: middleware.user,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
