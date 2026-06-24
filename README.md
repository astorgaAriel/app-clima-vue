# App Clima Vue

Aplicación web interactiva para consultar información meteorológica de diferentes regiones y ciudades, desarrollada con **Vue 3** y **Vite**.

## Descripción

**App Clima Vue** es una aplicación moderna construida con Vue 3 que permite:
- Visualizar información meteorológica por regiones
- Consultar detalles climáticos de ciudades específicas
- Interfaz responsive y dinámica
- Integración con APIs de clima

  <img width="1300" height="944" alt="imagen" src="https://github.com/user-attachments/assets/84bf9db1-2071-4ae9-a0a2-e92bb0806518" />


### Tecnologías

- **Vue 3**: Framework progresivo para interfaces de usuario
- **Vue Router 5**: Enrutamiento y navegación entre vistas
- **Vite**: Herramienta de compilación rápida y eficiente
- **JavaScript ES6+**: Composables y sintaxis moderna

## Rutas y Vistas

La aplicación cuenta con las siguientes rutas principales:

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` o `/home` | `Home` | Vista principal con mapa de regiones y búsqueda de ciudades |
| `/:nombre` | `CityDetail` | Detalle climático de una ciudad específica |

### Componentes Principales

- **Home.vue**: Diseño principal con navegación
- **CityDetail.vue**: Página de detalle de ciudad
- **Navbar.vue**: Barra de navegación
- **MapRegion.vue**: Visualización interactiva de regiones
- **RegionView.vue**: Vista de región seleccionada
- **Card.vue**: Componente reutilizable para mostrar información
- **AlertaClima.vue**: Alertas climáticas

## Cómo Ejecutar

### Requisitos Previos

- Node.js >= 20.19.0 o >= 22.12.0
- npm o yarn

### Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone <git@github.com:astorgaAriel/app-clima-vue.git>
cd app-clima-vue

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (hot-reload)
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilación para Producción

```bash
# Generar build optimizado
npm run build

# Vista previa del build de producción
npm run preview
```

Los archivos compilados estarán en la carpeta `dist/`

## Despliegue

### Opción 1: Vercel

https://clima-vue-ariel.vercel.app/

2. Ejecutar: `npm run build && git add dist && git commit -m "Deploy" && git push`

### Opción 4: Servidor Propio (Node.js)

1. Compilar proyecto: `npm run build`
2. Instalar servidor: `npm install -g serve`
3. Ejecutar: `serve -s dist`

## Estructura del Proyecto

```
app-clima-vue/
│
├── index.html                   # Punto de entrada HTML
├── vite.config.js               # Configuración de Vite
├── jsconfig.json                # Configuración JavaScript
├── package.json                 # Dependencias y scripts
├── vercel.json                  # Configuración de despliegue Vercel
├── .gitignore                   # Archivos ignorados por Git
│
├── public/
│   └── favicon.ico
│
├── .vscode/
│   ├── extensions.json          # Extensiones recomendadas
│   └── settings.json
│
└── src/
    ├── main.js                  # Bootstrap: monta la app Vue
    ├── App.vue                  # Componente raíz (Navbar + RouterView)
    ├── router.js                # Rutas: / y /:nombre
    │
    ├── components/
    │   ├── Home.vue             # Vista principal (sidebar + contenido)
    │   ├── CityDetail.vue       # Detalle de ciudad con pronóstico
    │   ├── Navbar.vue           # Barra de navegación + buscador
    │   ├── MapRegion.vue        # Mapa SVG interactivo de Chile
    │   ├── RegionView.vue       # Grid de cards de la región activa
    │   ├── Card.vue             # Tarjeta de ciudad con clima actual
    │   └── AlertaClima.vue      # Alertas climáticas de la región
    │
    ├── composables/
    │   ├── useWeatherApi.js     # Llamadas a la API del clima + caché
    │   ├── useAlert.js          # Lógica de generación de alertas
    │   ├── useGlobalRegion.js   # Estado global de región activa
    │   └── useRegion.js         # Utilidades de región
    │
    ├── services/
    │   └── regionData.js        # Datos estáticos de regiones y comunas (lat/lon)
    │
    └── assets/
        ├── css/
        │   └── style.css        # Estilos globales
        └── img/
            ├── logo.png
            ├── Los-Andes-MOP.webp   # Fondo de CityDetail
            ├── frio.png
            ├── lluvia.png
            ├── Nublado.png
            ├── ParcialNublado.png
            ├── Soliado.png
            ├── tormentaElectrica.png
            ├── viento.png
            ├── gota.png
            └── temp.png
```
## Configuración Recomendada

### IDE Setup

- [VS Code](https://code.visualstudio.com/)
- Extensión: [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Desactivar extensión Vetur si está instalada

### DevTools

**Chrome/Edge/Brave:**
- [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

**Firefox:**
- [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

##  Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con hot-reload |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa del build compilado |

## Referencias

- [Documentación de Vue 3](https://vuejs.org/)
- [Documentación de Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vite Configuration Reference](https://vite.dev/config/)

##  Repositorio

[GitHub - app-clima-vue](https://github.com/astorgaAriel/app-clima-vue/tree/main)


