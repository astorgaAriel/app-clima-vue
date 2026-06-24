import { useWeatherAPI } from './useWeatherApi'

export function useAlerts() {
  const { weatherCache } = useWeatherAPI()

  const generarAlertas = (region) => {
    const alertas = []

    if (!region || !region.comunas) return alertas

    const comunasAlerta = {
      temp_baja: [],
      temp_alta: [],
      vientos_fuertes: [],
      tormenta: [],
      lluvia_fuerte: [],
      niebla: []
    }

    // Evaluar cada comuna en base a los datos del clima
    for (const [nombreComuna, coords] of Object.entries(region.comunas)) {
      const key = `${coords.lat},${coords.lon}`
      const weather = weatherCache.value[key]

      if (weather) {
        // Alerta de temperatura baja (< 0°C)
        if (weather.temp < 0) {
          comunasAlerta.temp_baja.push(nombreComuna)
        }
        // Alerta de temperatura alta (> 30°C)
        if (weather.temp > 30) {
          comunasAlerta.temp_alta.push(nombreComuna)
        }
        // Alerta de vientos fuertes (> 30 km/h)
        if (weather.viento > 30) {
          comunasAlerta.vientos_fuertes.push(nombreComuna)
        }
        // Alerta por tormenta o lluvia fuerte
        const condicion = weather.condicion?.toLowerCase() || ''
        if (condicion.includes('tormenta') || condicion.includes('thunderstorm')) {
          comunasAlerta.tormenta.push(nombreComuna)
        }
        if (condicion.includes('lluvia') || condicion.includes('rain')) {
          comunasAlerta.lluvia_fuerte.push(nombreComuna)
        }
        // Alerta por niebla
        if (condicion.includes('niebla') || condicion.includes('fog') || condicion.includes('mist')) {
          comunasAlerta.niebla.push(nombreComuna)
        }
      }
    }

    return Object.entries(comunasAlerta)
      .filter(([_, comunas]) => comunas.length > 0)
      .map(([tipo, comunas]) => ({
        tipo,
        titulo: getTituloAlerta(tipo),
        descripcion: getDescripcionAlerta(tipo),
        comunas: comunas.map(c => {
          // Convertir nombre de comuna a formato legible
          return c.replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        })
      }))
  }

  const getTituloAlerta = (tipo) => {
    const titulos = {
      'temp_baja': 'Temperatura Baja',
      'temp_alta': 'Temperatura Alta',
      'vientos_fuertes': 'Vientos Fuertes',
      'tormenta': 'Tormenta Eléctrica',
      'lluvia_fuerte': 'Lluvia Fuerte',
      'niebla': 'Niebla Densa'
    }
    return titulos[tipo]
  }

  const getDescripcionAlerta = (tipo) => {
    const descripciones = {
      'temp_baja': 'Se esperan temperaturas bajo cero',
      'temp_alta': 'Se esperan temperaturas superiores a 30°C',
      'vientos_fuertes': 'Vientos superiores a 30 km/h',
      'tormenta': 'Posible tormenta eléctrica',
      'lluvia_fuerte': 'Lluvia intensa',
      'niebla': 'Visibilidad reducida por niebla'
    }
    return descripciones[tipo]
  }

  return { generarAlertas }
}