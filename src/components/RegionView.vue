<template>
  <div class="region-view">
    <h1 class="region-title">{{ region.region }}</h1>
    
    <div class="cities-grid">
      <Card 
        v-for="(ciudad, key) in ciudades"
        :key="key"
        :ciudad="ciudad"
        :nombre="key"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Card from './Card.vue'
import { useWeatherAPI } from '../composables/useWeatherApi'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  region: Object
})

const { getWeather } = useWeatherAPI()
const authStore = useAuthStore()

const ciudades = computed(() => props.region?.comunas || {})
const unidad = computed(() => authStore.preferencias?.unidad ?? 'C')

const cargarClima = async () => {
  for (const [nombre, coords] of Object.entries(ciudades.value)) {
    await getWeather(coords.lat, coords.lon, nombre, unidad.value)
  }
}

onMounted(cargarClima)

watch(unidad, () => {
  cargarClima()
})
</script>

<style scoped>
.region-view {
  animation: fadeIn 0.3s ease-in-out;
}

.region-title {
  font-size: 32px;
  color: #1a1a1a;
  margin-bottom: 30px;
  font-weight: 700;
  border-bottom: 3px solid #4CAF50;
  padding-bottom: 15px;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .cities-grid {
    grid-template-columns: 1fr;
  }
  
  .region-title {
    font-size: 24px;
  }
}
</style>