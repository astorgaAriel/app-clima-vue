<template>
  <div class="page-container">
    <div class="page-header">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2M20 12h2"/>
      </svg>
      <h1>Mis Preferencias</h1>
      <p>Personaliza tu experiencia</p>
    </div>

    <div class="prefs-card">
      <div class="usuario-section">
        <div class="avatar">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="usuario-info">
          <span class="usuario-nombre">{{ authStore.nombreUsuario }}</span>
          <span class="usuario-email">{{ authStore.usuario?.email }}</span>
        </div>
      </div>

      <hr class="divider" />

      <div class="pref-section">
        <h2>Unidad de temperatura</h2>
        <div class="unidad-toggle">
          <button
            class="unidad-btn"
            :class="{ active: preferencias.unidad === 'C' }"
            @click="cambiarUnidad('C')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a7 7 0 0 0 0 14"/>
              <path d="M12 2a7 7 0 0 1 0 14"/>
              <line x1="12" y1="16" x2="12" y2="22"/>
              <line x1="8" y1="20" x2="16" y2="20"/>
            </svg>
            Celsius (°C)
          </button>
          <button
            class="unidad-btn"
            :class="{ active: preferencias.unidad === 'F' }"
            @click="cambiarUnidad('F')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a7 7 0 0 0 0 14"/>
              <path d="M12 2a7 7 0 0 1 0 14"/>
              <line x1="12" y1="16" x2="12" y2="22"/>
              <line x1="8" y1="20" x2="16" y2="20"/>
            </svg>
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      <div class="pref-section">
        <h2>Tema visual</h2>
        <div class="tema-toggle">
          <button
            class="tema-btn"
            :class="{ active: preferencias.tema === 'claro' }"
            @click="cambiarTema('claro')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            Claro
          </button>
          <button
            class="tema-btn"
            :class="{ active: preferencias.tema === 'oscuro' }"
            @click="cambiarTema('oscuro')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            Oscuro
          </button>
        </div>
      </div>

      <div v-if="guardado" class="alert-success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Preferencias guardadas
      </div>
    </div>

    <div class="prefs-card stats-card">
      <h2>Resumen de cuenta</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ authStore.favoritos.length }}</span>
          <span class="stat-label">Favoritos</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ preferencias.unidad === 'C' ? '°C' : '°F' }}</span>
          <span class="stat-label">Unidad activa</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ preferencias.tema === 'claro' ? 'Claro' : 'Oscuro' }}</span>
          <span class="stat-label">Tema</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const guardado = ref(false)

const preferencias = computed(() => authStore.preferencias)

const cambiarUnidad = (unidad) => {
  authStore.actualizarPreferencias({ unidad })
  mostrarConfirmacion()
}

const cambiarTema = (tema) => {
  authStore.actualizarPreferencias({ tema })
  mostrarConfirmacion()
}

const mostrarConfirmacion = () => {
  guardado.value = true
  setTimeout(() => { guardado.value = false }, 2500)
}
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
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

.prefs-card {
  background: rgba(255,255,255,0.97);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.usuario-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.usuario-nombre {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.usuario-email {
  display: block;
  font-size: 0.88rem;
  color: #666;
  margin-top: 2px;
}

.divider {
  border: none;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

.pref-section {
  margin-bottom: 24px;
}

.pref-section h2 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.unidad-toggle,
.tema-toggle {
  display: flex;
  gap: 12px;
}

.unidad-btn,
.tema-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: #fafafa;
  color: #555;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.unidad-btn:hover,
.tema-btn:hover {
  border-color: #4CAF50;
  color: #4CAF50;
}

.unidad-btn.active,
.tema-btn.active {
  border-color: #4CAF50;
  background: #e8f5e9;
  color: #2e7d32;
}

.alert-success {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  border-radius: 8px;
  color: #2e7d32;
  font-size: 0.9rem;
  font-weight: 600;
}

.stats-card h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 10px;
}

.stat-value {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: #4CAF50;
}

.stat-label {
  display: block;
  font-size: 0.82rem;
  color: #666;
  margin-top: 4px;
}
</style>
