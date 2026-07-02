<template>
  <div class="app-container">
    <aside class="sidebar">
      <MapRegion 
        :active-region="activeRegion" 
        @region-click="handleRegionSelect" 
      />
    </aside>
    
    <main class="main-content">
      <AlertaClima v-if="activeRegion" :region="activeRegion" />
      <RegionView v-if="activeRegion" :region="activeRegion" />
    </main>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import MapRegion from './MapRegion.vue'
import RegionView from './RegionView.vue'
import AlertaClima from './AlertaClima.vue'
import { useGlobalRegion } from '../composables/useGlobalRegion'

const { activeRegion, selectRegion } = useGlobalRegion()

const handleRegionSelect = async (regionId) => {
  selectRegion(regionId)
  await nextTick()
  const regionView = document.querySelector('.region-view')
  if (regionView) {
    regionView.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex: 1;
  gap: 0;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 25%;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: rgba(229, 230, 235, 0.233);
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    flex: 0 0 auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
