import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SamplingView from '../views/SamplingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sampling',
      name: 'sampling',
      component: SamplingView
    },
    {
      path: '/biomat',
      name: 'biomat',
      component: () => import ('../views/BioMatView.vue')
    },
    {
      path: '/specimen',
      name: 'specimen',
      component: () => import ('../views/SpecimenView.vue')
    },
    {
      path: '/sequencing',
      name: 'sequencing',
      component: () => import ('../views/SequencingView.vue')
    },
    {
      path: '/storage',
      name: 'storage',
      component: () => import ('../views/StorageView.vue')
    },
    {
      path: '/identification',
      name: 'identification',
      component: () => import ('../views/IdentificationView.vue')
    },
    {
      path: '/motu',
      name: 'motu',
      component: () => import ('../views/MotuView.vue')
    },
    {
      path: "/biomat-external",
      name: "biomat-external",
      component: () => import ('../views/external/BioMatView.vue')
    }
  ]
})

export default router
