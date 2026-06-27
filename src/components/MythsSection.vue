<script setup lang="ts">
const myths = [
  {
    myth: 'Necesito una embutidora industrial para empezar',
    truth: 'Con una embutidora manual de $20 y tripas naturales puedes hacer chorizos de calidad profesional.',
  },
  {
    myth: 'Hacer embutidos es complicado y requiere químicos',
    truth: 'Las recetas tradicionales usan solo carne, grasa, sal, especias y tripas. Sin aditivos raros.',
  },
  {
    myth: 'Esto es solo otro PDF genérico sin valor',
    truth: 'Son 10 recetas probadas + 7 bonos + acceso a comunidad activa con chefs resolviendo dudas.',
  },
  {
    myth: 'Los precios bajos significan baja calidad',
    truth: 'No hay suscripción. Pagas $97 una vez y te llevas todo el conocimiento + 6 bonos de por vida.',
  },
]
</script>

<template>
  <section class="myths">
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Mitos vs Realidad
      </h2>
      <div class="myth-list">
        <details v-for="(m, i) in myths" :key="i" class="myth-item">
          <summary class="myth-q">
            <i class="myth-icon fas fa-times"></i>
            {{ m.myth }}
          </summary>
          <div class="myth-a">
            <i class="truth-icon fas fa-check"></i>
            {{ m.truth }}
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.myths {
  padding: 4rem 1.5rem;
}

.section-inner {
  max-width: 720px;
  margin: 0 auto;
}

.section-heading {
  font-family: $font-mono;
  font-size: 1.3rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.heading-marker {
  color: $primary;
}

.myth-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.myth-item {
  border: 2px solid $ink;
  border-radius: 8px;
  background: $white;
  overflow: hidden;
}

.myth-q {
  font-family: $font-mono;
  font-size: 0.95rem;
  font-weight: 600;
  color: $ink;
  padding: 1rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    background: rgba($cream, 0.5);
  }
}

.myth-icon {
  color: $alert-error;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.myth-a {
  font-family: $font-secondary;
  font-size: 0.9rem;
  line-height: 1.6;
  color: $ink-light;
  padding: 0 1.25rem 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.truth-icon {
  color: $alert-success;
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}
</style>
