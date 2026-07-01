<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <img src="../assets/img/logo.png" alt="Logo" class="navbar-logo" />
        <span class="navbar-title">AppClima</span>
      </div>

      <button
        class="hamburger"
        :class="{ active: isMenuOpen }"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar-menu" :class="{ active: isMenuOpen }">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="/" class="nav-link active">Home</a>
          </li>

          <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle" @click="isDropdownOpen = !isDropdownOpen">
              Regiones
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>

            <ul v-if="isDropdownOpen" class="dropdown-menu">
              <li v-for="(region, id) in regions" :key="id">
                <a
                  href="#"
                  class="dropdown-item"
                  @click.prevent="selectRegion(id)"
                >
                  {{ region.region }}
                </a>
              </li>
            </ul>
          </li>

          <template v-if="authStore.isAuthenticated">
            <li class="nav-item">
              <router-link to="/favoritos" class="nav-link" @click="isMenuOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Favoritos
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/preferencias" class="nav-link" @click="isMenuOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2M20 12h2"/>
                </svg>
                Preferencias
              </router-link>
            </li>
          </template>
        </ul>

        <form @submit.prevent="handleSearch" class="search-form">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar región o ciudad"
            class="search-input"
            @keydown="searchQuery"
          />
          <button type="submit" class="search-btn">Buscar</button>
        </form>

        <div v-if="authStore.isAuthenticated" class="user-section">
          <div class="user-info">
            <div class="user-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span class="user-name">{{ authStore.nombreUsuario }}</span>
          </div>
          <button class="btn-logout" @click="handleLogout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Salir
          </button>
        </div>

        <div v-else class="auth-links">
          <router-link to="/login" class="btn-login" @click="isMenuOpen = false">
            Iniciar sesión
          </router-link>
          <router-link to="/registro" class="btn-register" @click="isMenuOpen = false">
            Registrarse
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCiudadesPrincipales } from '../services/regionData'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['region-selected'])
const router = useRouter()
const authStore = useAuthStore()

const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const searchQuery = ref('')
const regions = getCiudadesPrincipales()

const selectRegion = (regionId) => {
  emit('region-selected', regionId)
  isMenuOpen.value = false
  isDropdownOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  isMenuOpen.value = false
  router.push('/login')
}

const handleSearch = () => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return

  for (const [regionId, region] of Object.entries(regions)) {
    if (region.region.toLowerCase().includes(query)) {
      selectRegion(regionId)
      searchQuery.value = ''
      return
    }

    for (const [cityKey] of Object.entries(region.comunas)) {
      const cityName = cityKey.replace(/_/g, ' ')
      if (cityName.toLowerCase().includes(query)) {
        const cityNameWithUnderscore = cityName.replace(/ /g, '_')
        router.push(`/${cityNameWithUnderscore}`)
        isMenuOpen.value = false
        isDropdownOpen.value = false
        searchQuery.value = ''
        return
      }
    }
  }
  alert('No encontrado: ' + searchQuery.value)
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.navbar-logo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar-title {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  gap: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 1;
  margin-left: 50px;
}

.navbar-nav {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-link:hover,
.nav-link.active {
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.dropdown-toggle svg {
  transition: transform 0.3s ease;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  list-style: none;
  margin: 10px 0 0 0;
  padding: 8px 0;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  max-height: 400px;
  overflow-y: auto;
}

.dropdown-item {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f0f0f0;
  color: #4CAF50;
  padding-left: 28px;
}

.search-form {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.search-input {
  padding: 10px 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 200px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
  background: rgba(255, 255, 255, 0.15);
}

.search-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-name {
  color: white;
  font-size: 14px;
  font-weight: 600;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: rgba(229, 57, 53, 0.2);
  border-color: rgba(229, 57, 53, 0.5);
  color: #ef9a9a;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.btn-login {
  padding: 8px 18px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-login:hover {
  background: rgba(255,255,255,0.1);
}

.btn-register {
  padding: 8px 18px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  transition: opacity 0.2s;
}

.btn-register:hover {
  opacity: 0.9;
}

/* Responsivo */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar-menu {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(45, 45, 45, 0.98);
    padding: 20px;
    gap: 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
  }

  .navbar-menu.active {
    transform: translateX(0);
  }

  .navbar-nav {
    flex-direction: column;
    gap: 15px;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 10px;
  }

  .search-form {
    flex-direction: column;
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .user-section,
  .auth-links {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
}
</style>