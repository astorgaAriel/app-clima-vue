<template>
  <div class="city-detail">
    <div class="detail-header">
      <router-link to="/" class="back-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Volver
      </router-link>
      <h1 class="city-name">{{ nombre }}</h1>
      <div class="location-info">
        <span v-if="currentWeather">{{ currentWeather.region }}</span>
      </div>

      <button
        v-if="authStore.isAuthenticated"
        class="btn-favorito"
        :class="{ activo: esFavorito }"
        @click="toggleFavorito"
        :title="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" :fill="esFavorito ? '#f59e0b' : 'none'" stroke="#f59e0b" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        {{ esFavorito ? 'En favoritos' : 'Agregar a favoritos' }}
      </button>

      <router-link v-else to="/login" class="btn-favorito-login">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Inicia sesión para guardar
      </router-link>
    </div>

    <div class="content-container">
      <!-- Alertas Climáticas -->
      <div v-if="alertas && alertas.length > 0" class="alertas-section">
        <h2>⚠️ Alertas Climáticas</h2>
        <div class="alertas-list">
          <div v-for="(alerta, idx) in alertas" :key="idx" class="alert-item" :class="alerta.tipo">
            <div class="alert-header">
              <h3>{{ alerta.titulo }}</h3>
              <span class="alert-type">{{ alerta.tipo }}</span>
            </div>
            <p>{{ alerta.descripcion }}</p>
            <div class="alert-comunas">
              <strong>Comunas afectadas:</strong>
              <ul>
                <li v-for="(comuna, i) in alerta.comunas" :key="i">{{ comuna }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

  
      <div v-if="currentWeather" class="current-weather-section">
        <div class="current-card">
          <div class="current-left">
            <img :src="currentWeather.iconoAPI" :alt="currentWeather.condicion" class="current-icon" />
            <div class="current-temp">{{ currentWeather.temp }}{{ unidadLabel }}</div>
          </div>
          <div class="current-right">
            <div class="condition-text">{{ currentWeather.condicionDescripcion }}</div>
            <div class="temp-range">
              <span>Máx: {{ currentWeather.tempMax }}{{ unidadLabel }}</span>
              <span>Mín: {{ currentWeather.tempMin }}{{ unidadLabel }}</span>
            </div>
            <div class="weather-details">
              <div class="detail-item">
                <span class="detail-label">Humedad</span>
                <span class="detail-value">{{ currentWeather.humedad }}%</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Viento</span>
                <span class="detail-value">{{ currentWeather.viento }} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div v-if="forecast && forecast.dias.length > 0" class="forecast-section">
        <h2>Pronóstico por Hora</h2>
        
        <div class="dias-list">
          <div v-for="(dia, idx) in forecast.dias" :key="idx" class="dia-item">
            <button 
              class="dia-header"
              :class="{ expanded: expandedDias[idx] }"
              @click="toggleDia(idx)"
            >
              <span class="dia-info">
                <span class="dia-titulo">{{ dia.dia }}</span>
                <span class="dia-fecha">{{ dia.fecha }}</span>
              </span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                class="chevron-icon"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            <div v-if="expandedDias[idx]" class="horas-list">
              <div v-for="(hora, hIdx) in dia.horas" :key="hIdx" class="hora-item">
                <div class="hora-tiempo">{{ hora.hora }}</div>
                <img :src="hora.iconoAPI" :alt="hora.condicion" class="hora-icon-small" />
                <div class="hora-info">
                  <div class="hora-temp-main">{{ hora.temp }}{{ unidadLabel }}</div>
                  <div class="hora-condicion">{{ hora.condicion }}</div>
                </div>
                <div class="hora-stats">
                  <div class="stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0 -8 3.582 -8 8s3.582 8 8 8 8 -3.582 8 -8 -3.582 -8 -8 -8z"/>
                    </svg>
                    {{ hora.humedad }}%
                  </div>
                  <div class="stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 12c0 2.76 2.24 5 5 5s5 -2.24 5 -5 -2.24 -5 -5 -5 -5 2.24 -5 5z"/>
                    </svg>
                    {{ hora.viento }}km/h
                  </div>
                  <div v-if="hora.posibilidadLluvia > 0" class="stat lluvia">
                    🌧️ {{ hora.posibilidadLluvia }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando información...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWeatherAPI } from '../composables/useWeatherApi'
import { useAlerts } from '../composables/useAlert'
import { getCiudadesPrincipales } from '../services/regionData'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  nombre: String
})

const router = useRouter()
const route = useRoute()
const { getWeather, getForecast } = useWeatherAPI()
const { generarAlertas } = useAlerts()
const authStore = useAuthStore()

const currentWeather = ref(null)
const forecast = ref(null)
const alertas = ref([])
const loading = ref(true)
const expandedDias = ref({})

const unidad = computed(() => authStore.preferencias?.unidad ?? 'C')
const unidadLabel = computed(() => unidad.value === 'F' ? '°F' : '°C')

const claveNombre = computed(() =>
  props.nombre?.toLowerCase().replace(/ /g, '_') ?? ''
)

const esFavorito = computed(() =>
  authStore.favoritos.includes(claveNombre.value)
)

const toggleFavorito = () => {
  if (esFavorito.value) {
    authStore.quitarFavorito(claveNombre.value)
  } else {
    authStore.agregarFavorito(claveNombre.value)
  }
}

const getCoordinates = () => {
  if (history.state?.lat !== undefined && history.state?.lon !== undefined) {
    return {
      lat: history.state.lat,
      lon: history.state.lon
    }
  }
  const ciudades = getCiudadesPrincipales()
  const nombreLower = props.nombre?.toLowerCase() ?? ''
  for (const region of Object.values(ciudades)) {
    for (const [key, coordsEntry] of Object.entries(region.comunas ?? {})) {
      if (key.toLowerCase() === nombreLower) {
        return { lat: coordsEntry.lat, lon: coordsEntry.lon }
      }
    }
  }
  return null
}

const coords = computed(() => getCoordinates())

const cargarDatos = async () => {
  loading.value = true
  try {
    if (!coords.value) {
      console.error('No se encontraron las coordenadas para la ciudad:', props.nombre)
      return
    }

    currentWeather.value = await getWeather(coords.value.lat, coords.value.lon, props.nombre, unidad.value)
    forecast.value = await getForecast(coords.value.lat, coords.value.lon, props.nombre, 3, unidad.value)

    if (forecast.value && forecast.value.dias.length > 0) {
      expandedDias.value[0] = true
    }

    const ciudades = getCiudadesPrincipales()
    const region = Object.values(ciudades).find(r => {
      return Object.values(r.comunas || {}).some(c =>
        Math.abs(c.lat - coords.value.lat) < 0.1 && Math.abs(c.lon - coords.value.lon) < 0.1
      )
    })

    if (region) {
      alertas.value = generarAlertas(region)
    }
  } catch (error) {
    console.error('Error loading city details:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await nextTick()
  await cargarDatos()
})

watch(unidad, () => {
  cargarDatos()
})

const toggleDia = (index) => {
  expandedDias.value[index] = !expandedDias.value[index]
}
</script>

<style scoped>
.city-detail {
  min-height: 100vh;
  background-image: url("../assets/img/Los-Andes-MOP.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 20px;
}

.detail-header {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #4CAF50;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #45a049;
  transform: translateX(-2px);
}

.btn-favorito {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding: 10px 18px;
  background: #fff8e1;
  border: 2px solid #f59e0b;
  color: #b45309;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-favorito:hover,
.btn-favorito.activo {
  background: #fef3c7;
}

.btn-favorito-login {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  padding: 10px 16px;
  background: #f5f5f5;
  border: 2px solid #ddd;
  color: #777;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-favorito-login:hover {
  border-color: #4CAF50;
  color: #4CAF50;
  background: #e8f5e9;
}

.city-name {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
}

.location-info {
  font-size: 14px;
  color: #666;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}


.alertas-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.alertas-section h2 {
  margin-top: 0;
  color: #d32f2f;
  font-size: 22px;
}

.alertas-list {
  display: grid;
  gap: 15px;
}

.alert-item {
  padding: 15px;
  border-left: 4px solid #ff9800;
  background: #fff8e1;
  border-radius: 6px;
}

.alert-item.temp_baja {
  border-left-color: #2196F3;
  background: #e3f2fd;
}

.alert-item.temp_alta {
  border-left-color: #f44336;
  background: #ffebee;
}

.alert-item.vientos_fuertes {
  border-left-color: #9c27b0;
  background: #f3e5f5;
}

.alert-item.tormenta {
  border-left-color: #424242;
  background: #eceff1;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.alert-item h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.alert-type {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.1);
}

.alert-item p {
  margin: 8px 0;
  color: #555;
  font-size: 14px;
}

.alert-comunas {
  font-size: 13px;
  color: #666;
}

.alert-comunas ul {
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.alert-comunas li {
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  font-size: 12px;
}


.current-weather-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.current-card {
  display: flex;
  gap: 30px;
  align-items: center;
}

.current-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.current-icon {
  width: 100px;
  height: 100px;
}

.current-temp {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
}

.current-right {
  flex: 1;
}

.condition-text {
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
}

.temp-range {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-label {
  font-size: 12px;
  text-transform: uppercase;
  color: #999;
  font-weight: 600;
}

.detail-value {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}


.forecast-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.forecast-section h2 {
  margin-top: 0;
  color: #1a1a1a;
  font-size: 22px;
  margin-bottom: 20px;
}

.dia-forecast {
  margin-bottom: 30px;
}

.dia-titulo {
  font-size: 16px;
  font-weight: 700;
  color: #4CAF50;
  margin: 0 0 15px 0;
  text-transform: capitalize;
}

.horas-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.hora-card {
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
  position: relative;
}

.hora-card:hover {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hora-tiempo {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #666;
}

.hora-card:hover .hora-tiempo {
  color: white;
}

.hora-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 5px;
}

.hora-temp {
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0;
  color: #1a1a1a;
}

.hora-card:hover .hora-temp {
  color: white;
}

.hora-detalle {
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #ddd;
  color: #777;
}

.hora-card:hover .hora-detalle {
  color: rgba(255, 255, 255, 0.9);
  border-top-color: rgba(255, 255, 255, 0.3);
}

.detalle-mini {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
}

.lluvia-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ff6b6b;
  color: white;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 3px;
  font-weight: 700;
}


.dias-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dia-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
}

.dia-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dia-header {
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.dia-header:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
}

.dia-header.expanded {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border-bottom-color: #2e7d32;
}

.dia-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.dia-titulo {
  font-weight: 700;
  text-transform: capitalize;
}

.dia-fecha {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
}

.chevron-icon {
  transition: transform 0.3s ease;
  transform: rotate(0deg);
}

.dia-header.expanded .chevron-icon {
  transform: rotate(180deg);
}

.horas-list {
  padding: 0;
  max-height: 1000px;
  overflow: hidden;
  animation: expandHeight 0.3s ease forwards;
}

@keyframes expandHeight {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
}

.hora-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  transition: all 0.2s ease;
}

.hora-item:hover {
  background: rgba(76, 175, 80, 0.05);
}

.hora-tiempo {
  min-width: 50px;
  font-weight: 700;
  color: #4CAF50;
  font-size: 14px;
}

.hora-icon-small {
  width: 36px;
  height: 36px;
}

.hora-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 100px;
}

.hora-temp-main {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.hora-condicion {
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
}

.hora-stats {
  display: flex;
  gap: 16px;
  margin-left: auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}

.stat svg {
  color: #4CAF50;
}

.stat.lluvia {
  color: #2196F3;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
    text-align: center;
  }

  .city-name {
    font-size: 28px;
  }

  .current-card {
    flex-direction: column;
  }

  .horas-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>
