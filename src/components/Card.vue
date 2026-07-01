<template>
  <div class="weather-card" @click="navigateToCityDetail">
    <div class="card-header">
      <h3 class="card-title">{{ nombre }}</h3>
      <span class="card-day">{{ diaActual }}</span>
    </div>

    <div class="card-body" v-if="weather">
      <div class="temperature-section">
        <img :src="iconoLocal(weather.condicion)" :alt="weather.condicion" class="weather-icon" />
        <div class="temp-info">
          <div class="temp-current">{{ weather.temp }}{{ unidadLabel }}</div>
          <div class="temp-range">
            <img :src="tempIcon" alt="temperatura" class="temp-range-icon" />
            <span>Máx: {{ weather.tempMax }}{{ unidadLabel }}</span>
            <span>Mín: {{ weather.tempMin }}{{ unidadLabel }}</span>
          </div>
        </div>
      </div>

      <p class="condition">{{ weather.condicionDescripcion }}</p>

      <div class="weather-details">
        <div class="detail">
          <img :src="gotaIcon" alt="humedad" class="detail-icon" />
          <span>{{ weather.humedad }}%</span>
        </div>
        <div class="detail">
          <img :src="vientoIcon" alt="viento" class="detail-icon" />
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
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherAPI } from '../composables/useWeatherApi'
import { useAuthStore } from '../stores/auth'
import imgSoliado from '../assets/img/Soliado.png'
import imgParcialNublado from '../assets/img/ParcialNublado.png'
import imgNublado from '../assets/img/Nublado.png'
import imgLluvia from '../assets/img/lluvia.png'
import imgTormenta from '../assets/img/tormentaElectrica.png'
import imgFrio from '../assets/img/frio.png'
import imgNoche from '../assets/img/noche.png'
import vientoIcon from '../assets/img/viento.png'
import gotaIcon from '../assets/img/gota.png'
import tempIcon from '../assets/img/temp.png'

const esNoche = () => {
  const h = new Date().getHours()
  return h >= 20 || h < 6
}

const iconoLocal = (condicion) => {
  if (!condicion) return imgSoliado
  const c = condicion.toLowerCase()
  if (c.includes('tormenta') || c.includes('trueno') || c.includes('rayo')) return imgTormenta
  if (c.includes('lluvia') || c.includes('llovizna') || c.includes('chubasco') || c.includes('aguacero')) return imgLluvia
  if (c.includes('nieve') || c.includes('nevada') || c.includes('aguanieve') || c.includes('granizo') || c.includes('helad') || c.includes('frio') || c.includes('frío')) return imgFrio
  if (c.includes('niebla') || c.includes('neblina') || c.includes('bruma') || c.includes('cubierto')) return imgNublado
  if (c.includes('nublado')) return imgNublado
  if (c.includes('parcialmente') || c.includes('parcial')) return imgParcialNublado
  if (c.includes('despejado') || c.includes('soleado') || c.includes('sol')) return esNoche() ? imgNoche : imgSoliado
  return esNoche() ? imgNoche : imgSoliado
}

const props = defineProps({
  ciudad: Object,
  nombre: String
})

const router = useRouter()
const authStore = useAuthStore()
const weather = ref(null)
const diaActual = new Date().toLocaleDateString('es-CL', { weekday: 'short' })

const { getWeather } = useWeatherAPI()

const unidad = computed(() => authStore.preferencias?.unidad ?? 'C')
const unidadLabel = computed(() => unidad.value === 'F' ? '°F' : '°C')

const cargarClima = async () => {
  weather.value = await getWeather(props.ciudad.lat, props.ciudad.lon, props.nombre, unidad.value)
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

watch(unidad, () => {
  cargarClima()
})
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
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.detail-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  opacity: 0.75;
}

.temp-range-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.7;
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