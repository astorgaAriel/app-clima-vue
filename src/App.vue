<template>
  {{ txt }}
  <div id="app" class="app">
    <Navbar @region-selected="selectRegion" />
    
    <router-view></router-view>
  </div>
</template>

<script setup>
import { Text } from 'vue';
import Navbar from './components/Navbar.vue'
import { useGlobalRegion } from './composables/useGlobalRegion'

const { selectRegion } = useGlobalRegion()
const txt = import.meta.env.VITE_HOLA
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