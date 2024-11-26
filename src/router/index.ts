import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import Login from '@/views/Login.vue'
import PegawaiView from '@/views/PegawaiView.vue'
import BarangView from '@/views/BarangView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      component: PegawaiView,
    },
    {
      path: '/barang',
      name: 'barang',
      component: BarangView,
    }
  ],
})

export default router
