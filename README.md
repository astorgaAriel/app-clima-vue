# App Clima Vue

Aplicación web interactiva para consultar información meteorológica de diferentes regiones y ciudades, desarrollada con **Vue 3** y **Vite**.

## Descripción

**App Clima Vue** es una aplicación moderna construida con Vue 3 que permite:
- Visualizar información meteorológica por regiones
- Consultar detalles climáticos de ciudades específicas
- Interfaz responsive y dinámica
- Integración con APIs de clima

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

## 🚀 Cómo Ejecutar

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

## 🌐 Despliegue

### Opción 1: Vercel

https://clima-vue-ariel.vercel.app/

2. Ejecutar: `npm run build && git add dist && git commit -m "Deploy" && git push`

### Opción 4: Servidor Propio (Node.js)

1. Compilar proyecto: `npm run build`
2. Instalar servidor: `npm install -g serve`
3. Ejecutar: `serve -s dist`

## 📁 Estructura del Proyecto

```
app-clima-vue/
├── src/
│   ├── components/          # Componentes Vue
│   ├── composables/         # Lógica reutilizable
│   ├── services/            # Servicios (API, datos)
│   ├── assets/              # Imágenes, estilos
│   ├── App.vue              # Componente raíz
│   ├── main.js              # Punto de entrada
│   └── router.js            # Configuración de rutas
├── public/                  # Archivos estáticos
├── dist/                    # Build de producción
├── vite.config.js           # Configuración de Vite
├── jsconfig.json            # Configuración de JavaScript
└── package.json             # Dependencias y scripts
```

## 🛠️ Configuración Recomendada

### IDE Setup

- [VS Code](https://code.visualstudio.com/)
- Extensión: [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Desactivar extensión Vetur si está instalada

### DevTools

**Chrome/Edge/Brave:**
- [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

**Firefox:**
- [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con hot-reload |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa del build compilado |

## 📚 Referencias

- [Documentación de Vue 3](https://vuejs.org/)
- [Documentación de Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vite Configuration Reference](https://vite.dev/config/)

## 🔗 Repositorio

[GitHub - app-clima-vue](SUSTITUIR_CON_URL_REPO)

## 📄 Licencia

Este proyecto está disponible bajo licencia libre (especificar si aplica)

---

**Desarrollado con ❤️ usando Vue 3 + Vite**
