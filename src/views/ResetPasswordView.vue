<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../services/authService'

const route = useRoute()
const router = useRouter()

const token = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

onMounted(() => {
  const t = route.query.token as string
  if (!t) {
    error.value = 'Token inválido. Solicita un nuevo enlace de recuperación.'
  }
  token.value = t
})

async function handleReset() {
  error.value = ''

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true
  try {
    await authService.resetPassword(token.value, password.value)
    success.value = true
    setTimeout(() => router.push('/acceso'), 3000)
  } catch (err: any) {
    error.value = err?.message || 'Error al restablecer la contraseña'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="reset-page">
    <div class="reset-card">
      <div class="reset-header">
        <div class="reset-logo">
          <i class="fas fa-lock-open"></i>
        </div>
        <h1>Restablecer contraseña</h1>
        <p class="reset-sub">Elige una nueva contraseña para tu cuenta</p>
      </div>

      <template v-if="success">
        <div class="success-message">
          <i class="fas fa-check-circle fa-2x"></i>
          <p>Contraseña actualizada exitosamente</p>
          <p class="success-hint">Serás redirigido al inicio de sesión...</p>
        </div>
      </template>

      <template v-else-if="!error">
        <form class="reset-form" @submit.prevent="handleReset">
          <div class="field">
            <label for="password"><i class="fas fa-lock"></i> Nueva contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••••"
              required
              minlength="6"
              autocomplete="new-password"
            />
          </div>
          <div class="field">
            <label for="confirm"><i class="fas fa-check"></i> Confirmar contraseña</label>
            <input
              id="confirm"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••••"
              required
              minlength="6"
              autocomplete="new-password"
            />
          </div>

          <p v-if="error" class="form-error"><i class="fas fa-exclamation-circle"></i> {{ error }}</p>

          <button type="submit" class="btn-reset" :disabled="loading">
            <i class="fas fa-save"></i> {{ loading ? 'Guardando...' : 'Cambiar contraseña' }}
          </button>
        </form>
      </template>

      <div v-else class="error-state">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <p>{{ error }}</p>
        <a href="/acceso/recuperar" class="back-link">Solicitar nuevo enlace</a>
      </div>

      <p v-if="!success && !error" class="reset-back">
        <a href="/acceso"><i class="fas fa-arrow-left"></i> Volver a iniciar sesión</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reset-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: $cream;
}

.reset-card {
  background: $white;
  border: 3px solid $ink;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
}

.reset-header {
  text-align: center;
  margin-bottom: 2rem;
}

.reset-logo {
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

.reset-sub {
  font-family: $font-secondary;
  font-size: 0.85rem;
  color: $text-secondary;
}

.reset-form {
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

.btn-reset {
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

.success-message {
  text-align: center;
  padding: 1rem 0;

  i {
    color: $alert-success;
    margin-bottom: 1rem;
  }

  p {
    font-family: $font-secondary;
    font-size: 0.95rem;
    color: $ink;
    margin: 0.5rem 0;
  }

  .success-hint {
    font-size: 0.8rem;
    color: $text-secondary;
  }
}

.error-state {
  text-align: center;
  padding: 1rem 0;

  i {
    color: $alert-error;
    margin-bottom: 1rem;
  }

  p {
    font-family: $font-secondary;
    font-size: 0.95rem;
    color: $ink;
    margin: 0.5rem 0;
  }

  .back-link {
    display: inline-block;
    margin-top: 1rem;
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.reset-back {
  text-align: center;
  margin-top: 1.5rem;

  a {
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $primary;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
