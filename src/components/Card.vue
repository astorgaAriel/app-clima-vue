<template>
  <div class="weather-card" @click="navigateToCityDetail">
    <div class="card-header">
      <h3 class="card-title">{{ nombre }}</h3>
      <span class="card-day">{{ diaActual }}</span>
    </div>

    <div class="card-body" v-if="weather">
      <div class="temperature-section">
        <img :src="weather.iconoAPI" :alt="weather.condicion" class="weather-icon" />
        <div class="temp-info">
          <div class="temp-current">{{ weather.temp }}°C</div>
          <div class="temp-range">
            <span>Máx: {{ weather.tempMax }}°</span>
            <span>Mín: {{ weather.tempMin }}°</span>
          </div>
        </div>
      </div>

      <p class="condition">{{ weather.condicionDescripcion }}</p>

      <div class="weather-details">
        <div class="detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 19c-4.3 1.4 -4.3 -8.5 0 -9.5 0 -5 3 -7 6 -7 .6 0 1.2 0 1.8 .1"/>
          </svg>
          <span>{{ weather.humedad }}%</span>
        </div>
        <div class="detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 19H5c-1 0 -1 -1 -1 -2V7c0 -1 0 -2 1 -2h14c1 0 2 1 2 2v8"/>
            <path d="M14.5 4v10"/>
          </svg>
          <span>{{ weather.viento }} km/h</span>
        </div>
      </div>

      <div class="click-hint">
        Ver detalles →
      </div>
    </div>

    <div class="loading" v-else>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherAPI } from '../composables/useWeatherApi'

const props = defineProps({
  ciudad: Object,
  nombre: String
})

const router = useRouter()
const weather = ref(null)
const diaActual = new Date().toLocaleDateString('es-CL', { weekday: 'short' })

const { getWeather } = useWeatherAPI()

const cargarClima = async () => {
  weather.value = await getWeather(props.ciudad.lat, props.ciudad.lon, props.nombre)
}

const navigateToCityDetail = () => {
  if (props.ciudad && weather.value) {
    router.push({
      name: 'CityDetail',
      params: { nombre: encodeURIComponent(props.nombre) },
      state: { lat: props.ciudad.lat, lon: props.ciudad.lon }
    })
  }
}

watch(() => props.ciudad, async () => {
  await nextTick()
  cargarClima()
}, { immediate: true })
</script>

<style scoped>
.weather-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #4CAF50;
  cursor: pointer;
}

.weather-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #f0f8ff 0%, #e8f5e9 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  text-transform: capitalize;
}

.card-day {
  background: #4CAF50;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.temperature-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.weather-icon {
  width: 50px;
  height: 50px;
}

.temp-info {
  flex: 1;
}

.temp-current {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

.temp-range {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.temp-range span {
  display: flex;
  align-items: center;
}

.condition {
  font-size: 14px;
  color: #555;
  margin: 0;
  text-transform: capitalize;
}

.weather-details {
  display: flex;
  gap: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 12px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
}

.detail svg {
  flex-shrink: 0;
  color: #4CAF50;
}

.click-hint {
  font-size: 12px;
  font-weight: 600;
  color: #4CAF50;
  text-align: right;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.weather-card:hover .click-hint {
  opacity: 1;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .weather-card {
    padding: 15px;
  }

  .card-title {
    font-size: 16px;
  }

  .temp-current {
    font-size: 24px;
  }
}
</style>