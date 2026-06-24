# App Clima Vue

Aplicación web interactiva para consultar información meteorológica de diferentes regiones y ciudades de Chile, desarrollada con **Vue 3**, **Vite** y **Pinia**.

## Descripción

**App Clima Vue** es una SPA moderna que permite:
- Visualizar información meteorológica por regiones de Chile
- Consultar el clima actual y pronóstico por hora de ciudades específicas
- Registrarse e iniciar sesión para acceder a funcionalidades personalizadas
- Guardar ciudades favoritas y acceder a ellas rápidamente
- Configurar preferencias de unidad de temperatura (°C / °F) y tema visual (claro / oscuro)
- Interfaz responsive con tema oscuro integrado

  <img width="1300" height="944" alt="imagen" src="https://github.com/user-attachments/assets/84bf9db1-2071-4ae9-a0a2-e92bb0806518" />


## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| **Vue 3** | ^3.5 | Framework principal, Composition API |
| **Vue Router 5** | ^5.1 | Enrutamiento SPA y guards de navegación |
| **Pinia** | ^3.x | Estado global (autenticación y preferencias) |
| **Vite** | ^8.x | Herramienta de compilación |
| **JavaScript ES6+** | — | Composables, async/await |

## Rutas y Vistas

| Ruta | Vista | Acceso | Descripción |
|------|-------|--------|-------------|
| `/` o `/home` | `Home` | Público | Vista principal con mapa de regiones |
| `/:nombre` | `CityDetail` | Público | Clima actual y pronóstico de una ciudad |
| `/login` | `LoginView` | Solo no autenticados | Formulario de inicio de sesión |
| `/registro` | `RegisterView` | Solo no autenticados | Formulario de creación de cuenta |
| `/favoritos` | `FavoritosView` | Requiere login | Lista de ciudades guardadas por el usuario |
| `/preferencias` | `PreferenciasView` | Requiere login | Ajustes de temperatura y tema visual |

Las rutas `/favoritos` y `/preferencias` redirigen a `/login` si el usuario no está autenticado. Las rutas `/login` y `/registro` redirigen a `/` si ya hay sesión activa.

## Autenticación

El sistema de autenticación utiliza **Pinia** para el estado global y `localStorage` para persistir la sesión entre recargas.

### Flujo de login
1. El usuario ingresa correo y contraseña en `/login`
2. Se valida contra el servicio mock (`src/services/mockUsers.js`)
3. Si es correcto: se guarda el usuario en el store y se redirige a Home (o a la ruta original si fue redirigido)
4. Si falla: se muestra el mensaje de error `"Correo o contraseña incorrectos"`

### Cuentas de prueba

| Correo | Contraseña | Favoritos |
|--------|-----------|-----------|
| `demo@demo.cl` | `123456` | Santiago, Valparaíso |
| `Ariel@demo.cl` | `abc123` | pirque, san jose de maipo |

### Registro
En `/registro` se puede crear una cuenta nueva. El formulario valida nombre, correo válido, contraseña mínima de 6 caracteres y confirmación de contraseña. El usuario queda logueado automáticamente al registrarse.

### Cerrar sesión
El botón **Salir** en el Navbar limpia el estado de Pinia y `localStorage`, y redirige a `/login`.

## Personalización de usuario

Una vez autenticado, cada usuario cuenta con:

### Ciudades favoritas (`/favoritos`)
- Agrega ciudades desde el botón de estrella en la vista de detalle (`CityDetail`)
- Accede a ellas directamente desde el Navbar
- Elimina favoritos desde la vista `/favoritos`

### Preferencias (`/preferencias`)
- **Unidad de temperatura**: `°C` (Celsius) o `°F` (Fahrenheit). Cambia la unidad globalmente en todas las tarjetas y vistas, consultando el campo `temp_c` o `temp_f` directamente desde la WeatherAPI.
- **Tema visual**: `Claro` u `Oscuro`. El tema oscuro aplica una paleta completa mediante clases CSS en el elemento raíz.

Las preferencias se persisten en `localStorage` junto con la sesión del usuario.

## Store Pinia — `useAuthStore`

```js
// Estado
usuario          // Objeto con nombre, email, favoritos, preferencias
isAuthenticated  // Boolean

// Getters
nombreUsuario    // nombre del usuario activo
favoritos        // array de ciudades favoritas
preferencias     // { unidad: 'C'|'F', tema: 'claro'|'oscuro' }

// Actions
login(email, password)              // Autentica y guarda en localStorage
registrar(nombre, email, password)  // Crea cuenta y autentica
logout()                            // Limpia estado y localStorage
restoreSession()                    // Restaura desde localStorage al montar la app
agregarFavorito(ciudad)             // Agrega ciudad a favoritos
quitarFavorito(ciudad)              // Quita ciudad de favoritos
actualizarPreferencias(prefs)       // Actualiza preferencias del usuario
```

## Componentes Principales

| Componente | Descripción |
|---|---|
| `Home.vue` | Vista principal con sidebar de mapa y contenido de región |
| `CityDetail.vue` | Clima actual, pronóstico por hora y botón de favorito |
| `Navbar.vue` | Navegación, buscador, links de usuario y botón de cierre de sesión |
| `RegionView.vue` | Grid de tarjetas de ciudades de la región activa |
| `Card.vue` | Tarjeta de ciudad con temperatura en la unidad preferida del usuario |
| `MapRegion.vue` | Mapa SVG interactivo de Chile |
| `AlertaClima.vue` | Alertas climáticas de la región |
| `LoginView.vue` | Formulario de inicio de sesión con validación |
| `RegisterView.vue` | Formulario de registro de cuenta |
| `FavoritosView.vue` | Lista de ciudades favoritas del usuario (ruta protegida) |
| `PreferenciasView.vue` | Panel de preferencias del usuario (ruta protegida) |

## Estructura del Proyecto

```
app-clima-vue/
│
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
│
└── src/
    ├── main.js                  # Monta app, registra Pinia y restaura sesión
    ├── App.vue                  # Raíz: aplica clase tema-oscuro según preferencia
    ├── router.js                # Rutas + beforeEach guard de autenticación
    │
    ├── stores/
    │   └── auth.js              # Store Pinia de autenticación y preferencias
    │
    ├── views/
    │   ├── LoginView.vue        # Vista de login
    │   ├── RegisterView.vue     # Vista de registro
    │   ├── FavoritosView.vue    # Vista de favoritos (protegida)
    │   └── PreferenciasView.vue # Vista de preferencias (protegida)
    │
    ├── components/
    │   ├── Home.vue
    │   ├── CityDetail.vue       # Incluye botón de favorito y conversión de unidad
    │   ├── Navbar.vue           # Muestra usuario activo y botón de logout
    │   ├── MapRegion.vue
    │   ├── RegionView.vue       # Carga clima con la unidad del usuario
    │   ├── Card.vue             # Muestra °C o °F según preferencia
    │   └── AlertaClima.vue
    │
    ├── composables/
    │   ├── useWeatherApi.js     # API del clima con soporte de unidad (temp_c / temp_f)
    │   ├── useAlert.js
    │   ├── useGlobalRegion.js
    │   └── useRegion.js
    │
    ├── services/
    │   ├── regionData.js        # Datos de regiones y comunas (lat/lon)
    │   └── mockUsers.js         # Usuarios de prueba y funciones login/registro mock
    │
    └── assets/
        ├── css/style.css
        └── img/
```

## Cómo Ejecutar

### Requisitos

- Node.js >= 20.19.0 o >= 22.12.0

### Instalación

```bash
git clone <git@github.com:astorgaAriel/app-clima-vue.git>
cd app-clima-vue
npm install
```



### Desarrollo

```bash
npm run dev
# http://localhost:5173
```

### Producción

```bash
npm run build
npm run preview
```

## Despliegue

### Vercel

https://clima-vue-ariel.vercel.app/

```bash
npm run build && git add dist && git commit -m "Deploy" && git push
```

### Servidor propio

```bash
npm run build
npm install -g serve
serve -s dist
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Compilación para producción |
| `npm run preview` | Vista previa del build |

## Configuración de IDE

- [VS Code](https://code.visualstudio.com/) con extensión [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Desactivar Vetur si está instalado

## Referencias

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vite.dev/)
- [WeatherAPI](https://www.weatherapi.com/)

## Repositorio

[GitHub - app-clima-vue](https://github.com/astorgaAriel/app-clima-vue/tree/main)
