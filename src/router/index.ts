import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SamplingView from '../views/SamplingView.vue'
import BioMatView from '../views/BioMatView.vue'
import SpecimenView from '../views/SpecimenView.vue'
import SequencingView from '../views/SequencingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/workflow',
      name: 'workflow',
      // route level code-splitting
      // this generates a separate chunk (Workflow.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WorkflowView.vue')
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
    }
  ]
})

export default router
