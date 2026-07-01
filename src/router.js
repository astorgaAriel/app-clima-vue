import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import CityDetail from './components/CityDetail.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import FavoritosView from './views/FavoritosView.vue'
import PreferenciasView from './views/PreferenciasView.vue'

const routes = [
  {
    path: '/',
    component: Home,
    alias: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { soloPublico: true }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegisterView,
    meta: { soloPublico: true }
  },
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: FavoritosView,
    meta: { requiereAuth: true }
  },
  {
    path: '/preferencias',
    name: 'Preferencias',
    component: PreferenciasView,
    meta: { requiereAuth: true }
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

router.beforeEach((to, from) => {
  const savedUser = localStorage.getItem('auth_usuario')
  const isAuthenticated = !!savedUser

  if (to.meta.requiereAuth && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  if (to.meta.soloPublico && isAuthenticated) {
    return { path: '/' }
  }

  return true
})
