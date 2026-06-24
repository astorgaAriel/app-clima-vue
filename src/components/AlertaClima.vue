<template>
  <div class="alertas-container" v-if="alertas.length">
    <div class="alertas-header">
      <h2>⚠️ Alertas Climáticas</h2>
    </div>
    
    <div class="alertas-list">
      <div 
        v-for="(alerta, index) in alertas" 
        :key="index"
        class="alerta-item"
        :class="`alerta-${alerta.tipo}`"
      >
        <!-- Aquí usamos <img> directamente -->
        <div class="alerta-icon">
          <img 
            v-if="getIcon(alerta.tipo)" 
            :src="getIcon(alerta.tipo)" 
            :alt="alerta.tipo" 
            width="30" 
            height="30" 
          />
          <span v-else style="font-size:30px">⚠️</span>
        </div>

        <div class="alerta-content">
          <h4 class="alerta-titulo">{{ alerta.titulo }}</h4>
          <p class="alerta-descripcion">{{ alerta.descripcion }}</p>
          <p class="alerta-comunas">Afecta a: {{ alerta.comunas.join(', ') }}</p>
        </div>
        <button @click="dismissAlerta(index)" class="alerta-close">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '../composables/useAlert'

// Importa las imágenes desde assets
import frio from '../assets/img/frio.png'
import temp from '../assets/img/temp.png'
import viento from '../assets/img/viento.png'
import tormentaElectrica from '../assets/img/tormentaElectrica.png'
import lluvia from '../assets/img/lluvia.png'
import nublado from '../assets/img/Nublado.png'

const props = defineProps({
  region: Object
})

const { generarAlertas } = useAlerts()
const dismissedAlerts = ref(new Set())

const alertas = computed(() => {
  const todasAlertas = generarAlertas(props.region)
  return todasAlertas.filter((_, index) => !dismissedAlerts.value.has(index))
})

const getIcon = (tipo) => {
  const icons = {
    temp_baja: frio,
    temp_alta: temp,
    vientos_fuertes: viento,
    tormenta: tormentaElectrica,
    lluvia_fuerte: lluvia,
    niebla: nublado
  }
  return icons[tipo] || null
}

const dismissAlerta = (index) => {
  dismissedAlerts.value.add(index)
}
</script>

<style scoped>
.alertas-container {
  margin-bottom: 30px;
  animation: slideIn 0.4s ease-out;
}

.alertas-header {
  margin-bottom: 15px;
}

.alertas-header h2 {
  font-size: 20px;
  margin: 0;
  color: #d32f2f;
}

.alertas-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alerta-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid;
  position: relative;
  animation: alertaFadeIn 0.3s ease-out;
}

.alerta-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.alerta-content {
  flex: 1;
}

.alerta-titulo {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 700;
}

.alerta-descripcion {
  margin: 0 0 5px 0;
  font-size: 13px;
  opacity: 0.9;
}

.alerta-comunas {
  margin: 0;
  font-size: 12px;
  opacity: 0.75;
  font-style: italic;
}

.alerta-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.alerta-close:hover {
  opacity: 1;
}

.alerta-temp_baja {
  background: #e3f2fd;
  border-color: #1976d2;
  color: #0d47a1;
}

.alerta-temp_alta {
  background: #ffebee;
  border-color: #d32f2f;
  color: #b71c1c;
}

.alerta-vientos_fuertes {
  background: #fff3e0;
  border-color: #f57c00;
  color: #e65100;
}

.alerta-tormenta {
  background: #f3e5f5;
  border-color: #7b1fa2;
  color: #4a148c;
}

.alerta-lluvia_fuerte {
  background: #e0f2f1;
  border-color: #00796b;
  color: #004d40;
}

.alerta-niebla {
  background: #eceff1;
  border-color: #37474f;
  color: #263238;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes alertaFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>