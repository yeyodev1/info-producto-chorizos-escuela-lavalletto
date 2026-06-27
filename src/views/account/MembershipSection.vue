<script setup lang="ts">
defineProps<{
  user: { email: string; transactionId: number; clientTransactionId: string }
  payments: any[]
}>()
</script>

<template>
  <div class="section-page">
    <div class="hero-card">
      <div class="hero-greeting">
        <h1>¡Bienvenido, Choricero!</h1>
        <p>Tu pasión por los embutidos artesanales ya está en marcha</p>
      </div>
      <div class="hero-email">{{ user.email }}</div>
    </div>

    <div class="card membership-card">
      <div class="card-header">
        <i class="fas fa-crown"></i>
        <span>Máster en Chorizos Artesanales</span>
        <div class="badge-active">
          <i class="fas fa-check-circle"></i>
          Activo
        </div>
      </div>
      <div class="card-body">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Acceso</span>
            <span class="info-value">Completo de por vida</span>
          </div>
          <div class="info-item">
            <span class="info-label">Transacción</span>
            <span class="info-value mono">#{{ user.transactionId }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Código</span>
            <span class="info-value mono small">{{ user.clientTransactionId }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Estado</span>
            <span class="info-value">
              <span class="dot dot-green"></span>
              {{ payments.length === 1 ? '1 pago realizado' : `${payments.length} pagos realizados` }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header secondary">
        <i class="fas fa-chart-line"></i>
        <span>Progreso</span>
      </div>
      <div class="card-body">
        <div class="progress-item">
          <div class="progress-top">
            <span>Bienvenida completada</span>
            <span class="progress-pct">100%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
        </div>
        <div class="progress-item">
          <div class="progress-top">
            <span>Recetas profesionales</span>
            <span class="progress-pct">0%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-page { animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.hero-card {
  background: linear-gradient(135deg, $primary, $primary-dark);
  border-radius: 12px;
  padding: 1.75rem;
  margin-bottom: 1.25rem;
  color: $white;
  h1 { font-family: $font-principal; font-size: 1.35rem; font-weight: 800; margin-bottom: 0.3rem; }
  p { font-family: $font-secondary; font-size: 0.85rem; opacity: 0.85; margin-bottom: 0.75rem; }
}
.hero-email {
  display: inline-block; font-family: $font-mono; font-size: 0.7rem;
  background: rgba(255,255,255,0.15); padding: 0.3rem 0.75rem; border-radius: 100px;
}

.card {
  background: $white; border: 1.5px solid $border; border-radius: 10px;
  overflow: hidden; margin-bottom: 1rem;
}
.card-header {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 1rem 1.25rem; border-bottom: 1px solid $border;
  font-family: $font-mono; font-size: 0.7rem; font-weight: 700; color: $ink-light;
  text-transform: uppercase; letter-spacing: 0.5px;
  i { color: $primary; font-size: 0.8rem; }
  &.secondary i { color: $accent-gold; }
}
.badge-active {
  margin-left: auto; display: flex; align-items: center; gap: 0.3rem;
  font-family: $font-mono; font-size: 0.6rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px;
  color: $white; background: $alert-success; padding: 0.25rem 0.6rem; border-radius: 100px;
  i { font-size: 0.55rem; color: $white; }
}
.card-body { padding: 1.25rem; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.info-item { display: flex; flex-direction: column; gap: 0.2rem; }
.info-label {
  font-family: $font-mono; font-size: 0.6rem; color: $text-secondary;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.info-value {
  font-family: $font-principal; font-size: 0.9rem; font-weight: 700; color: $ink;
  display: flex; align-items: center; gap: 0.35rem;
  &.mono { font-family: $font-mono; font-size: 0.8rem; }
  &.small { font-size: 0.7rem; font-weight: 600; word-break: break-all; }
}
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; &-green { background: $alert-success; } }

.progress-item { margin-bottom: 1rem; &:last-child { margin-bottom: 0; } }
.progress-top {
  display: flex; justify-content: space-between;
  font-family: $font-secondary; font-size: 0.8rem; color: $ink-light; margin-bottom: 0.35rem;
}
.progress-pct { font-family: $font-mono; font-size: 0.7rem; font-weight: 700; color: $text-secondary; }
.progress-bar { height: 6px; background: $cream; border-radius: 100px; overflow: hidden; }
.progress-fill {
  height: 100%; background: linear-gradient(90deg, $primary, lighten($primary, 15%));
  border-radius: 100px; transition: width 0.4s ease;
}

@media (max-width: 768px) {
  .info-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
}
</style>
