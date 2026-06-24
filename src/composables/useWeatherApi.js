import { ref } from 'vue'

const weatherCache = ref({})
const forecastCache = ref({})

export function useWeatherAPI() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_API_URL;

  const getWeather = async (lat, lon, nombre = '') => {
    const key = `${lat},${lon}`
    
    if (weatherCache.value[key]) {
      return weatherCache.value[key]
    }

    try {
      const url = `${baseURL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no&lang=es`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error?.message)

      const weather = transformarDatos(data, nombre)
      weatherCache.value[key] = weather
      return weather
    } catch (error) {
      console.error('Error fetching weather:', error)
      return null
    }
  }

  const getForecast = async (lat, lon, nombre = '', dias = 3) => {
    const key = `${lat},${lon}`
    
    if (forecastCache.value[key]) {
      return forecastCache.value[key]
    }

    try {
      const url = `${baseURL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${dias}&aqi=no&lang=es`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error?.message)

      const forecast = transformarPronostico(data, nombre)
      forecastCache.value[key] = forecast
      return forecast
    } catch (error) {
      console.error('Error fetching forecast:', error)
      return null
    }
  }

  const transformarDatos = (data, nombre = '') => {
    const current = data.current
    const location = data.location

    return {
      nombre: nombre || location.name,
      condicion: current.condition.text,
      condicionDescripcion: current.condition.text,
      temp: Math.round(current.temp_c),
      tempMax: Math.round(current.temp_c),
      tempMin: Math.round(current.temp_c),
      viento: Math.round(current.wind_kph),
      humedad: current.humidity,
      iconoAPI: `https:${current.condition.icon}`,
      lat: location.lat,
      lon: location.lon,
      region: location.region,
      pais: location.country
    }
  }

  const transformarPronostico = (data, nombre = '') => {
    const location = data.location
    const forecast = data.forecast.forecastday

    return {
      nombre: nombre || location.name,
      lat: location.lat,
      lon: location.lon,
      region: location.region,
      pais: location.country,
      dias: forecast.map(dia => ({
        fecha: dia.date,
        dia: new Date(dia.date).toLocaleDateString('es-CL', { weekday: 'short' }),
        maxTemp: Math.round(dia.day.maxtemp_c),
        minTemp: Math.round(dia.day.mintemp_c),
        condicion: dia.day.condition.text,
        iconoAPI: `https:${dia.day.condition.icon}`,
        humedad: dia.day.avg_humidity,
        viento: Math.round(dia.day.maxwind_kph),
        horas: dia.hour.map(hora => ({
          hora: new Date(hora.time).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
          tiempo: hora.time,
          temp: Math.round(hora.temp_c),
          condicion: hora.condition.text,
          iconoAPI: `https:${hora.condition.icon}`,
          viento: Math.round(hora.wind_kph),
          humedad: hora.humidity,
          posibilidadLluvia: hora.chance_of_rain
        }))
      }))
    }
  }

  return { getWeather, getForecast, weatherCache, forecastCache }
}