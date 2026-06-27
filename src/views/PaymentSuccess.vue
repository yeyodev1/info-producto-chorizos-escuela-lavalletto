<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { payphoneService } from '../services/payphoneService'

const route = useRoute()
const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')
const transactionId = ref<number | null>(null)
const credentials = ref<{ email: string; password: string } | null>(null)

function copyCredentials() {
  if (!credentials.value) return
  navigator.clipboard.writeText(`Email: ${credentials.value.email}\nContraseña: ${credentials.value.password}`)
}

onMounted(async () => {
  const id = route.query.id as string
  const clientTxId = route.query.clientTransactionId as string

  if (!id || !clientTxId) {
    status.value = 'error'
    message.value = 'Parámetros de pago inválidos.'
    return
  }

  try {
    const result = await payphoneService.confirmPayment(Number(id), clientTxId)

    if (result.success) {
      status.value = 'success'
      transactionId.value = result.transactionId
      message.value = '¡Pago confirmado! Tu acceso ya está disponible.'
      if (result.credentials) {
        credentials.value = result.credentials
      }
    } else {
      status.value = 'error'
      message.value = 'El pago no pudo ser confirmado. Contacta a soporte.'
    }
  } catch (err: any) {
    status.value = 'error'
    message.value = err?.message || 'Error al confirmar el pago.'
  }
})
</script>

<template>
  <div class="payment-success">
    <div class="result-card">
      <template v-if="status === 'loading'">
        <i class="fas fa-circle-notch fa-spin fa-3x" style="color: #0872a3"></i>
        <h2>Confirmando tu pago...</h2>
      </template>
      <template v-else-if="status === 'success'">
        <div class="icon-check"><i class="fas fa-check"></i></div>
        <h2>¡Pago exitoso!</h2>
        <p class="success-msg">{{ message }}</p>
        <p v-if="transactionId" class="tx-id">
          Transacción: #{{ transactionId }}
        </p>

        <div v-if="credentials" class="creds-box">
          <h3 class="creds-title"><i class="fas fa-key"></i> Tus credenciales de acceso</h3>
          <p class="creds-note">Revisa también tu correo — te enviamos esta información.</p>
          <div class="creds-field">
            <span class="creds-label">Email</span>
            <span class="creds-value">{{ credentials.email }}</span>
          </div>
          <div class="creds-field">
            <span class="creds-label">Contraseña</span>
            <span class="creds-value creds-password">{{ credentials.password }}</span>
          </div>
          <button class="copy-btn" @click="copyCredentials">
            <i class="fas fa-copy"></i> Copiar credenciales
          </button>
        </div>

        <div class="whatsapp-box">
          <div class="whatsapp-icon"><i class="fab fa-whatsapp"></i></div>
          <h3 class="whatsapp-title">Únete al grupo VIP de WhatsApp</h3>
          <p class="whatsapp-text">Resuelve dudas, comparte tus creaciones y recibe soporte directo de la comunidad y los chefs.</p>
          <a href="https://chat.whatsapp.com/JHuEdRnd8SRIR7wCYFa07W" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
            <i class="fab fa-whatsapp"></i> Unirme al grupo
          </a>
        </div>

        <div class="success-actions">
          <a :href="`/acceso?email=${credentials?.email}&password=${credentials?.password}`" class="btn-login">
            <i class="fas fa-sign-in-alt"></i> Ingresar ahora
          </a>
          <a href="/" class="btn-secondary">Volver al inicio</a>
        </div>
      </template>
      <template v-else>
        <div class="icon-error"><i class="fas fa-times"></i></div>
        <h2>Error en el pago</h2>
        <p class="error-msg">{{ message }}</p>
        <div class="success-actions">
          <a href="/#precios" class="btn-primary">Intentar de nuevo</a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-success {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: $cream;
}

.result-card {
  background: $white;
  border: 2px solid $ink;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  width: 100%;

  h2 {
    font-family: $font-principal;
    font-size: 1.5rem;
    font-weight: 700;
    color: $ink;
    margin: 1rem 0;
  }
}

.icon-check,
.icon-error {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  i {
    font-size: 1.75rem;
    color: $white;
  }
}

.icon-check {
  background: $alert-success;
}

.icon-error {
  background: $alert-error;
}

.success-msg,
.error-msg {
  font-family: $font-secondary;
  font-size: 1rem;
  line-height: 1.6;
  color: $ink-light;
  margin-bottom: 1rem;
}

.tx-id {
  font-family: $font-mono;
  font-size: 0.8rem;
  color: $text-secondary;
  margin-bottom: 1.5rem;
}

.creds-box {
  background: $cream;
  border: 2px solid $ink;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.creds-title {
  font-family: $font-principal;
  font-size: 0.95rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  i {
    color: $accent-gold;
  }
}

.creds-note {
  font-family: $font-secondary;
  font-size: 0.8rem;
  color: $text-secondary;
  margin-bottom: 0.75rem;
}

.creds-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid $border;

  &:last-of-type {
    border-bottom: none;
  }
}

.creds-label {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $text-secondary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.creds-value {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 600;
  color: $ink;
}

.creds-password {
  color: $primary;
  font-weight: 700;
}

.copy-btn {
  width: 100%;
  margin-top: 0.75rem;
  background: $ink;
  color: $white;
  border: 2px solid $ink;
  padding: 0.6rem;
  border-radius: 6px;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    background: $primary;
    border-color: $primary;
  }
}

.whatsapp-box {
  background: #e8f5e9;
  border: 2px solid #25d366;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.whatsapp-icon {
  font-size: 2.5rem;
  color: #25d366;
  margin-bottom: 0.5rem;
}

.whatsapp-title {
  font-family: $font-principal;
  font-size: 1.05rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.4rem;
}

.whatsapp-text {
  font-family: $font-secondary;
  font-size: 0.85rem;
  line-height: 1.5;
  color: $ink-light;
  margin-bottom: 1rem;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #25d366;
  color: $white;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-family: $font-mono;
  font-size: 0.9rem;
  font-weight: 700;
  transition: background 0.2s;

  &:hover {
    background: #1da851;
  }
}

.success-actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.btn-login,
.btn-secondary {
  display: block;
  padding: 0.85rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-family: $font-mono;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.2s;
  text-align: center;
}

.btn-login {
  background: $accent-gold;
  color: $ink;
  border: 2px solid $accent-gold;

  &:hover {
    background: darken($accent-gold, 8%);
    border-color: darken($accent-gold, 8%);
  }
}

.btn-secondary {
  background: transparent;
  color: $ink-light;
  border: 2px solid $border;
  font-weight: 600;

  &:hover {
    background: $cream;
    border-color: $ink-light;
  }
}
</style>
