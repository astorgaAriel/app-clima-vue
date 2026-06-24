import { ref } from 'vue'
import { getCiudadesPrincipales } from '../services/regionData'

const ciudadesChile = getCiudadesPrincipales()
const activeRegion = ref(ciudadesChile.CLRM) // Región Metropolitana por defecto

export function useGlobalRegion() {
  const selectRegion = (regionId) => {
    if (ciudadesChile[regionId]) {
      activeRegion.value = ciudadesChile[regionId]
    }
  }

  return {
    activeRegion,
    selectRegion
  }
}
