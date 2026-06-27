<script setup lang="ts">
const steps = [
  {
    icon: 'fa-kitchen-set',
    title: 'Técnica sobre herramientas',
    text: 'No necesitas una máquina de $500. Con un cuchillo afilado, tripas naturales y las manos puedes hacer chorizos de nivel profesional. La técnica es lo que cobra valor.',
  },
  {
    icon: 'fa-lightbulb',
    title: 'Creatividad artesanal',
    text: 'Los mejores embutidos nacen de entender los principios: punto de carne, emulsión, atado y cocción. Una vez que los dominas, puedes crear tus propias recetas.',
  },
]
</script>

<template>
  <section class="solution">
    <div class="section-inner">
      <h2 class="section-label">El cambio es de mentalidad</h2>
      <div class="grid">
        <div v-for="(step, i) in steps" :key="i" class="step-card">
          <i :class="['step-icon', 'fas', step.icon]"></i>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-text">{{ step.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.solution {
  padding: 4rem 1.5rem;
}

.section-inner {
  max-width: 900px;
  margin: 0 auto;
}

.section-label {
  font-family: $font-mono;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: $text-secondary;
  text-align: center;
  margin-bottom: 2.5rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.step-card {
  border: 2px solid $ink;
  border-radius: 8px;
  padding: 1.75rem;
  background: $white;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.step-icon {
  font-size: 2rem;
  color: $primary;
  display: block;
  margin-bottom: 0.75rem;
}

.step-title {
  font-family: $font-principal;
  font-size: 1.15rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.75rem;
}

.step-text {
  font-family: $font-secondary;
  font-size: 0.95rem;
  line-height: 1.7;
  color: $ink-light;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
