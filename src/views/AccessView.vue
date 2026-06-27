<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

onMounted(() => {
  if (route.query.email) email.value = route.query.email as string
  if (route.query.password) password.value = route.query.password as string
})

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const result = await authService.login(email.value, password.value)
    localStorage.setItem('access_token', result.token)
    router.push('/mi-cuenta')
  } catch (err: any) {
    error.value = err?.message || 'Credenciales inválidas'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="access-page">
    <div class="access-card">
      <div class="access-header">
        <div class="access-logo">
          <i class="fas fa-utensils"></i>
        </div>
        <h1>Tu acceso al Máster</h1>
        <p class="access-sub">Ingresa con las credenciales que recibiste por correo</p>
      </div>

      <form class="access-form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="email"><i class="fas fa-envelope"></i> Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            required
            autocomplete="email"
          />
        </div>
        <div class="field">
          <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••••"
            required
            autocomplete="current-password"
          />
        </div>

        <p v-if="error" class="form-error"><i class="fas fa-exclamation-circle"></i> {{ error }}</p>

        <button type="submit" class="btn-access" :disabled="loading">
          <i class="fas fa-sign-in-alt"></i> {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>

        <a href="/acceso/recuperar" class="forgot-link"><i class="fas fa-question-circle"></i> Olvidé mi contraseña</a>
      </form>

      <p class="access-footer">
        ¿No tienes cuenta?
        <a href="/#precios">Adquiere el Máster aquí</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.access-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: $cream;
}

.access-card {
  background: $white;
  border: 3px solid $ink;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
}

.access-header {
  text-align: center;
  margin-bottom: 2rem;
}

.access-logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: $primary;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  margin: 0 auto 1rem;
}

h1 {
  font-family: $font-principal;
  font-size: 1.35rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.35rem;
}

.access-sub {
  font-family: $font-secondary;
  font-size: 0.85rem;
  color: $text-secondary;
}

.access-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $ink-light;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.35rem;

    i {
      color: $primary;
    }
  }

  input {
    font-family: $font-mono;
    font-size: 0.9rem;
    padding: 0.75rem;
    border: 2px solid $border;
    border-radius: 6px;
    color: $ink;
    background: $white;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: $primary;
    }

    &::placeholder {
      color: $text-secondary;
    }
  }
}

.form-error {
  font-family: $font-mono;
  font-size: 0.8rem;
  color: $alert-error;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
}

.btn-access {
  width: 100%;
  background: $primary;
  color: $white;
  border: 2px solid $primary;
  padding: 0.85rem;
  border-radius: 6px;
  font-family: $font-mono;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: $accent-red;
    border-color: $accent-red;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.forgot-link {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $primary;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-top: -0.75rem;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
}

.access-footer {
  text-align: center;
  font-family: $font-secondary;
  font-size: 0.85rem;
  color: $text-secondary;
  margin-top: 1.5rem;

  a {
    color: $primary;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
