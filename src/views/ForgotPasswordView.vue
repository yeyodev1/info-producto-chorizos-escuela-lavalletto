<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '../services/authService'

const email = ref('')
const error = ref('')
const submitted = ref(false)
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await authService.forgotPassword(email.value)
    submitted.value = true
  } catch (err: any) {
    error.value = err?.message || 'Error al enviar la solicitud'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="forgot-page">
    <div class="forgot-card">
      <div class="forgot-header">
        <div class="forgot-logo">
          <i class="fas fa-key"></i>
        </div>
        <h1>Recuperar contraseña</h1>
        <p class="forgot-sub">Ingresa tu email y te enviaremos un enlace para restablecerla</p>
      </div>

      <form v-if="!submitted" class="forgot-form" @submit.prevent="handleSubmit">
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

        <p v-if="error" class="form-error"><i class="fas fa-exclamation-circle"></i> {{ error }}</p>

        <button type="submit" class="btn-forgot" :disabled="loading">
          <i class="fas fa-paper-plane"></i> {{ loading ? 'Enviando...' : 'Enviar enlace' }}
        </button>
      </form>

      <div v-else class="success-message">
        <i class="fas fa-check-circle fa-2x"></i>
        <p>Si el correo existe, recibirás un enlace para recuperar tu contraseña.</p>
        <p class="success-hint">Revisa tu bandeja de entrada y spam.</p>
      </div>

      <p class="forgot-back">
        <a href="/acceso"><i class="fas fa-arrow-left"></i> Volver a iniciar sesión</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.forgot-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: $cream;
}

.forgot-card {
  background: $white;
  border: 3px solid $ink;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
}

.forgot-header {
  text-align: center;
  margin-bottom: 2rem;
}

.forgot-logo {
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

.forgot-sub {
  font-family: $font-secondary;
  font-size: 0.85rem;
  color: $text-secondary;
}

.forgot-form {
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

.btn-forgot {
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

.forgot-back {
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
