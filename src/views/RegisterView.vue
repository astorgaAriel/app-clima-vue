<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="1.5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <line x1="19" y1="8" x2="19" y2="14"/>
          <line x1="22" y1="11" x2="16" y2="11"/>
        </svg>
        <h1>Crear cuenta</h1>
        <p>Regístrate para guardar tus ciudades favoritas</p>
      </div>

      <form @submit.prevent="handleRegistro" class="auth-form" novalidate>
        <div class="form-group">
          <label for="nombre">Nombre completo</label>
          <div class="input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              id="nombre"
              v-model="form.nombre"
              type="text"
              placeholder="Tu nombre"
              autocomplete="name"
              :class="{ error: errores.nombre }"
            />
          </div>
          <span v-if="errores.nombre" class="field-error">{{ errores.nombre }}</span>
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <div class="input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="correo@ejemplo.cl"
              autocomplete="email"
              :class="{ error: errores.email }"
            />
          </div>
          <span v-if="errores.email" class="field-error">{{ errores.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input
              id="password"
              v-model="form.password"
              :type="mostrarPassword ? 'text' : 'password'"
              placeholder="Mínimo 6 caracteres"
              autocomplete="new-password"
              :class="{ error: errores.password }"
            />
            <button type="button" class="toggle-password" @click="mostrarPassword = !mostrarPassword">
              <svg v-if="!mostrarPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
          <span v-if="errores.password" class="field-error">{{ errores.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirmar">Confirmar contraseña</label>
          <div class="input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input
              id="confirmar"
              v-model="form.confirmar"
              :type="mostrarPassword ? 'text' : 'password'"
              placeholder="Repite tu contraseña"
              autocomplete="new-password"
              :class="{ error: errores.confirmar }"
            />
          </div>
          <span v-if="errores.confirmar" class="field-error">{{ errores.confirmar }}</span>
        </div>

        <div v-if="authStore.error" class="alert-error">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {{ authStore.error }}
        </div>

        <button type="submit" class="btn-primary" :disabled="authStore.loading">
          <span v-if="authStore.loading" class="spinner-btn"></span>
          <span v-else>Crear cuenta</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Ya tienes cuenta?
          <router-link to="/login">Inicia sesión aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const mostrarPassword = ref(false)

const form = reactive({
  nombre: '',
  email: '',
  password: '',
  confirmar: ''
})

const errores = reactive({
  nombre: '',
  email: '',
  password: '',
  confirmar: ''
})

const validar = () => {
  errores.nombre = ''
  errores.email = ''
  errores.password = ''
  errores.confirmar = ''
  let valido = true

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es requerido'
    valido = false
  }

  if (!form.email) {
    errores.email = 'El correo es requerido'
    valido = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errores.email = 'Ingresa un correo válido'
    valido = false
  }

  if (!form.password) {
    errores.password = 'La contraseña es requerida'
    valido = false
  } else if (form.password.length < 6) {
    errores.password = 'Mínimo 6 caracteres'
    valido = false
  }

  if (!form.confirmar) {
    errores.confirmar = 'Confirma tu contraseña'
    valido = false
  } else if (form.password !== form.confirmar) {
    errores.confirmar = 'Las contraseñas no coinciden'
    valido = false
  }

  return valido
}

const handleRegistro = async () => {
  if (!validar()) return
  const ok = await authStore.registrar(form.nombre, form.email, form.password)
  if (ok) {
    router.push('/')
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-card {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 12px 0 6px;
}

.auth-header p {
  color: #666;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper svg:first-child {
  position: absolute;
  left: 12px;
  color: #999;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 44px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  outline: none;
  background: #fafafa;
}

.input-wrapper input:focus {
  border-color: #4CAF50;
  background: #fff;
}

.input-wrapper input.error {
  border-color: #e53935;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 0;
  display: flex;
  align-items: center;
}

.toggle-password:hover {
  color: #555;
}

.field-error {
  font-size: 0.82rem;
  color: #e53935;
}

.alert-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  color: #c62828;
  font-size: 0.9rem;
}

.btn-primary {
  padding: 14px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-btn {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 0.9rem;
  color: #555;
}

.auth-footer a {
  color: #4CAF50;
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
