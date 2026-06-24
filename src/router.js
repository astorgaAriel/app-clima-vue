import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './components/MainLayout.vue'
import CityDetail from './components/CityDetail.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    alias: '/home'
  },
  {
    path: '/:nombre',
    name: 'CityDetail',
    component: CityDetail,
    props: route => ({
      nombre: decodeURIComponent(route.params.nombre)
    })
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
