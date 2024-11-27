import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import Login from '@/views/Login.vue'
import PegawaiView from '@/views/PegawaiView.vue'
import BarangView from '@/views/BarangView.vue'
// import { useUserStore } from '@/stores/counter'
import UserManagement from '@/views/UserManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
      meta: { requiresAuth: true },
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      component: PegawaiView,
      meta: { requiresAuth: true },
    },
    {
      path: '/barang',
      name: 'barang',
      component: BarangView,
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: UserManagement,
      meta: { requiresAuth: true },
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   const store = useUserStore()
//   if (to.meta.requiresAuth && !store.token) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router