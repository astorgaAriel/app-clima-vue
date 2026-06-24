import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import CityDetail from './components/CityDetail.vue'

const routes = [
  {
    path: '/',
    component: Home,
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
