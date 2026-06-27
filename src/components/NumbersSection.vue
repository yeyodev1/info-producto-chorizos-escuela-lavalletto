<script setup lang="ts">
const stats = [
  { icon: 'fa-book', value: '10', label: 'recetas profesionales', suffix: '' },
  { icon: 'fa-gift', value: '7', label: 'bonos exclusivos', suffix: '' },
  { icon: 'fa-infinity', value: '', label: 'acceso vitalicio', suffix: '' },
]
</script>

<template>
  <section id="numeros" class="numbers">
    <div class="section-inner">
      <div v-for="stat in stats" :key="stat.label" class="stat-box">
        <i :class="['stat-icon', 'fas', stat.icon]"></i>
        <span v-if="stat.value" class="stat-value">{{ stat.value }}<small>{{ stat.suffix }}</small></span>
        <span v-else class="stat-value infinity">&infin;<small></small></span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.numbers {
  padding: 3rem 1.5rem;
  background: $ink;
  border-top: 3px solid $primary;
  border-bottom: 3px solid $primary;
}

.section-inner {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-box {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid rgba($white, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.stat-icon {
  font-size: 2rem;
  color: $primary;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-family: $font-mono;
  font-size: 3rem;
  font-weight: 900;
  color: $white;
  line-height: 1;

  small {
    font-size: 1.5rem;
    color: $primary;
  }

  &.infinity {
    font-size: 3.5rem;
  }
}

.stat-label {
  font-family: $font-mono;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba($white, 0.7);
}

@media (max-width: 640px) {
  .section-inner {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
