import { createRouter, createWebHistory } from 'vue-router'

import LandingPagePage from "@/pages/LandingPage.vue"
import ProfileSelectionPage from '@/pages/ProfileSelectionPage.vue'
import CVPage from '@/pages/CVPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    meta: {
      title: 'Home',
    },
    component: LandingPagePage,
  },
  {
    path: '/profiles',
    name: 'ProfileSelection',
    meta: {
      title: 'Select Profile',
    },
    component: ProfileSelectionPage,
  },
  {
    path: '/cv/:profile/:audience',
    name: 'CVPage',
    meta: {
      title: 'CV View',
    },
    component: CVPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

