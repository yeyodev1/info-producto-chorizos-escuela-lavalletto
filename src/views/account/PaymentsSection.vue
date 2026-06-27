<script setup lang="ts">
defineProps<{
  user: { email: string; transactionId: number; clientTransactionId: string }
  payments: any[]
}>()

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-EC', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency', currency: currency || 'USD', minimumFractionDigits: 2,
  }).format((amount || 0) / 100)
}
</script>

<template>
  <div class="section-page">
    <div class="hero-card">
      <h1>Mis Pagos</h1>
      <p>{{ payments.length === 0 ? 'Aún no tienes pagos registrados' : `Historial de ${payments.length} pago(s)` }}</p>
    </div>

    <div v-if="payments.length === 0" class="empty-state">
      <i class="fas fa-receipt"></i>
      <p>No hay pagos registrados</p>
    </div>

    <div v-for="p in payments" :key="p.transactionId" class="payment-card">
      <div class="payment-left">
        <div class="payment-icon" :class="p.transactionStatus === 'Approved' ? 'success' : 'pending'">
          <i :class="p.transactionStatus === 'Approved' ? 'fas fa-check' : 'fas fa-clock'"></i>
        </div>
        <div class="payment-info">
          <span class="payment-amount">{{ formatAmount(p.amount, p.currency) }}</span>
          <span class="payment-date">{{ formatDate(p.date) }}</span>
        </div>
      </div>
      <div class="payment-right">
        <span class="payment-badge" :class="p.transactionStatus === 'Approved' ? 'approved' : 'other'">
          {{ p.transactionStatus === 'Approved' ? 'Aprobado' : p.transactionStatus }}
        </span>
        <span class="payment-id">#{{ p.transactionId }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-page { animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.hero-card {
  background: $white; border: 2px solid $border; border-radius: 12px; padding: 1.75rem; margin-bottom: 1.25rem;
  h1 { font-family: $font-principal; font-size: 1.35rem; font-weight: 800; color: $ink; margin-bottom: 0.3rem; }
  p { font-family: $font-secondary; font-size: 0.85rem; color: $text-secondary; }
}

.payment-card {
  display: flex; align-items: center; justify-content: space-between;
  background: $white; border: 1.5px solid $border; border-radius: 10px;
  padding: 1rem 1.15rem; margin-bottom: 0.5rem; transition: all 0.15s;
  &:hover { border-color: $primary-light; }
}
.payment-left { display: flex; align-items: center; gap: 0.85rem; }
.payment-icon {
  width: 38px; height: 38px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  i { font-size: 0.85rem; color: $white; }
  &.success { background: $alert-success; }
  &.pending { background: $alert-warning; }
}
.payment-info { display: flex; flex-direction: column; gap: 0.1rem; }
.payment-amount { font-family: $font-principal; font-size: 0.95rem; font-weight: 800; color: $ink; }
.payment-date { font-family: $font-secondary; font-size: 0.7rem; color: $text-secondary; }
.payment-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; }
.payment-badge {
  font-family: $font-mono; font-size: 0.6rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 0.2rem 0.55rem; border-radius: 100px;
  &.approved { background: rgba($alert-success, 0.12); color: $alert-success; }
  &.other { background: rgba($alert-warning, 0.12); color: $alert-warning; }
}
.payment-id { font-family: $font-mono; font-size: 0.65rem; color: $text-secondary; }

.empty-state {
  text-align: center; padding: 3rem 1rem; color: $text-secondary; font-family: $font-secondary;
  i { font-size: 2rem; margin-bottom: 0.75rem; color: $border; }
  p { font-size: 0.9rem; }
}
</style>
