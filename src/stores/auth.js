import { defineStore } from 'pinia'
import { mockLogin, mockRegister } from '../services/mockUsers'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    isAuthenticated: false,
    error: null,
    loading: false
  }),

  getters: {
    nombreUsuario: (state) => state.usuario?.nombre ?? '',
    favoritos: (state) => state.usuario?.favoritos ?? [],
    preferencias: (state) =>
      state.usuario?.preferencias ?? { unidad: 'C', tema: 'claro' }
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const result = await mockLogin(email, password)
        if (result.success) {
          this.usuario = result.usuario
          this.isAuthenticated = true
          localStorage.setItem('auth_usuario', JSON.stringify(result.usuario))
          return true
        }
        this.error = result.mensaje
        return false
      } catch {
        this.error = 'Error al iniciar sesión'
        return false
      } finally {
        this.loading = false
      }
    },

    async registrar(nombre, email, password) {
      this.loading = true
      this.error = null
      try {
        const result = await mockRegister(nombre, email, password)
        if (result.success) {
          this.usuario = result.usuario
          this.isAuthenticated = true
          localStorage.setItem('auth_usuario', JSON.stringify(result.usuario))
          return true
        }
        this.error = result.mensaje
        return false
      } catch {
        this.error = 'Error al registrar usuario'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.usuario = null
      this.isAuthenticated = false
      this.error = null
      localStorage.removeItem('auth_usuario')
    },

    restoreSession() {
      const saved = localStorage.getItem('auth_usuario')
      if (saved) {
        try {
          this.usuario = JSON.parse(saved)
          this.isAuthenticated = true
        } catch {
          localStorage.removeItem('auth_usuario')
        }
      }
    },

    agregarFavorito(ciudad) {
      if (!this.usuario) return
      const clave = ciudad.toLowerCase().replace(/ /g, '_')
      if (!this.usuario.favoritos.includes(clave)) {
        this.usuario.favoritos.push(clave)
        localStorage.setItem('auth_usuario', JSON.stringify(this.usuario))
      }
    },

    quitarFavorito(ciudad) {
      if (!this.usuario) return
      const clave = ciudad.toLowerCase().replace(/ /g, '_')
      this.usuario.favoritos = this.usuario.favoritos.filter(f => f !== clave)
      localStorage.setItem('auth_usuario', JSON.stringify(this.usuario))
    },

    actualizarPreferencias(prefs) {
      if (!this.usuario) return
      this.usuario.preferencias = { ...this.usuario.preferencias, ...prefs }
      localStorage.setItem('auth_usuario', JSON.stringify(this.usuario))
    }
  }
})
