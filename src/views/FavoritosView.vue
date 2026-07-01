<template>
  <div class="page-container">
    <div class="page-header">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <h1>Mis Favoritos</h1>
      <p>Ciudades que has guardado</p>
    </div>

    <div v-if="favoritos.length === 0" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <h3>Sin ciudades favoritas aún</h3>
      <p>Busca una ciudad y agrégala con el botón de estrella</p>
      <router-link to="/" class="btn-go-home">Explorar ciudades</router-link>
    </div>

    <div v-else class="favoritos-grid">
      <div
        v-for="ciudad in favoritos"
        :key="ciudad"
        class="favorito-card"
      >
        <div class="favorito-info">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span class="ciudad-nombre">{{ formatearNombre(ciudad) }}</span>
        </div>
        <div class="favorito-actions">
          <router-link
            :to="`/${ciudad}`"
            class="btn-ver"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Ver clima
          </router-link>
          <button class="btn-quitar" @click="quitarFavorito(ciudad)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
            Quitar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const favoritos = computed(() => authStore.favoritos)

const formatearNombre = (clave) =>
  clave.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

const quitarFavorito = (ciudad) => {
  authStore.quitarFavorito(ciudad)
}
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.page-header p {
  color: rgba(255,255,255,0.7);
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-state h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.empty-state p {
  color: #666;
  font-size: 0.95rem;
}

.btn-go-home {
  margin-top: 8px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}

.btn-go-home:hover {
  opacity: 0.9;
}

.favoritos-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.favorito-card {
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  transition: transform 0.2s;
}

.favorito-card:hover {
  transform: translateY(-2px);
}

.favorito-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ciudad-nombre {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1a1a1a;
}

.favorito-actions {
  display: flex;
  gap: 10px;
}

.btn-ver {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-ver:hover {
  background: #c8e6c9;
}

.btn-quitar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #ffebee;
  color: #c62828;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-quitar:hover {
  background: #ffcdd2;
}

@media (max-width: 500px) {
  .favorito-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
