import { createRouter, createWebHistory } from 'vue-router'

import recruiters from '@/data/recruiters.yaml'
import hiringManager from '@/data/hiring-manager.yaml'
import engineeringManager from '@/data/engineering-manager.yaml'
import technicalPeer from '@/data/technical-peer.yaml'

import LandingPagePage from "@/pages/LandingPage.vue"

import RecruitersPage from '@/pages/RecruiterPage.vue'
import HiringManagerPage from '@/pages/HiringManagerPage.vue'
import EngineeringManagerPage from '@/pages/EngineeringManagerPage.vue'
import TechnicalPeerPage from '@/pages/TechnicalPeerPage.vue'

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
    path: '/recruiter',
    name: 'Recruiter',
    meta: {
      title: 'Recruiter',
    },
    component: RecruitersPage,
    props: {
      cv: recruiters
    }
  },
  {
    path: '/hiring-manager',
    name: 'HiringManager',
    meta: {
      title: 'Hiring Manager',
    },
    component: HiringManagerPage,
    props: {
      cv: hiringManager
    }
  },
  {
    path: '/engineering-manager',
    name: 'EngineeringManager',
    meta: {
      title: 'Engineering Manager',
    },
    component: EngineeringManagerPage,
    props: {
      cv: engineeringManager
    }
  },
  {
    path: '/technical-peer',
    name: 'TechnicalPeer',
    meta: {
      title: 'Technical Peer',
    },
    component: TechnicalPeerPage,
    props: {
      cv: technicalPeer
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

