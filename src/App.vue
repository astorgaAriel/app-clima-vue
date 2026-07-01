<template>
  <div id="app" class="app" :class="{ 'tema-oscuro': temaOscuro }">
    <Navbar @region-selected="selectRegion" />
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import AppFooter from './components/Footer.vue'
import { useGlobalRegion } from './composables/useGlobalRegion'
import { useAuthStore } from './stores/auth'

const { selectRegion } = useGlobalRegion()
const authStore = useAuthStore()

const temaOscuro = computed(() => authStore.preferencias?.tema === 'oscuro')
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url("./assets/img/Los-Andes-MOP.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

<style>
.tema-oscuro {
  filter: none;
}

.tema-oscuro .navbar {
  background: linear-gradient(90deg, #0a0a0a 0%, #111 100%) !important;
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.tema-oscuro .auth-card,
.tema-oscuro .prefs-card,
.tema-oscuro .favorito-card,
.tema-oscuro .empty-state {
  background: rgba(26, 26, 26, 0.97) !important;
  color: #e0e0e0;
  border: 1px solid rgba(255,255,255,0.08);
}

.tema-oscuro .auth-header h1,
.tema-oscuro .prefs-card h2,
.tema-oscuro .stats-card h2,
.tema-oscuro .ciudad-nombre {
  color: #e0e0e0 !important;
}

.tema-oscuro .auth-header p,
.tema-oscuro .usuario-email,
.tema-oscuro .stat-label,
.tema-oscuro .empty-state p {
  color: #aaa !important;
}

.tema-oscuro .form-group label,
.tema-oscuro .pref-section h2 {
  color: #ccc !important;
}

.tema-oscuro .input-wrapper input {
  background: #2a2a2a !important;
  border-color: #444 !important;
  color: #e0e0e0 !important;
}

.tema-oscuro .input-wrapper input::placeholder {
  color: #666 !important;
}

.tema-oscuro .input-wrapper input:focus {
  border-color: #4CAF50 !important;
  background: #333 !important;
}

.tema-oscuro .unidad-btn,
.tema-oscuro .tema-btn {
  background: #2a2a2a !important;
  border-color: #444 !important;
  color: #ccc !important;
}

.tema-oscuro .unidad-btn.active,
.tema-oscuro .tema-btn.active {
  background: #1a3320 !important;
  border-color: #4CAF50 !important;
  color: #81c784 !important;
}

.tema-oscuro .stat-item {
  background: #222 !important;
}

.tema-oscuro .detail-header,
.tema-oscuro .current-card,
.tema-oscuro .forecast-section,
.tema-oscuro .alertas-section,
.tema-oscuro .current-weather-section .current-card {
  background: rgba(26, 26, 26, 0.97) !important;
  color: #e0e0e0 !important;
}

.tema-oscuro .city-name,
.tema-oscuro .condition-text,
.tema-oscuro .detail-label,
.tema-oscuro .dia-titulo,
.tema-oscuro .dia-fecha {
  color: #e0e0e0 !important;
}

.tema-oscuro .dia-header {
  background: #222 !important;
  border-color: #333 !important;
  color: #e0e0e0 !important;
}

.tema-oscuro .dia-header:hover {
  background: #2a2a2a !important;
}

.tema-oscuro .hora-item {
  background: #1e1e1e !important;
  border-color: #333 !important;
  color: #ccc !important;
}

.tema-oscuro .current-card {
  box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
}

.tema-oscuro .main-content {
  background: rgba(10, 10, 10, 0.4) !important;
}

.tema-oscuro .dropdown-menu {
  background: #1e1e1e !important;
}

.tema-oscuro .dropdown-item {
  color: #ccc !important;
}

.tema-oscuro .dropdown-item:hover {
  background: #2a2a2a !important;
  color: #4CAF50 !important;
}

.tema-oscuro .demo-hint {
  background: #222 !important;
}

.tema-oscuro .demo-hint p {
  color: #aaa !important;
}

.tema-oscuro .demo-hint code {
  background: #333 !important;
  color: #ccc !important;
}
</style>