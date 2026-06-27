<script setup lang="ts">
const testimonials = [
  {
    name: '@carlos_m',
    text: 'Nunca pensé que podía hacer chorizo en mi cocina. La primera tanda voló, mi familia no paraba de comer.',
  },
  {
    name: '@maria_chef',
    text: 'Ya ahorré lo del curso solo en lo que dejé de pagar en suscripciones. Las recetas son brutales.',
  },
  {
    name: '@juan_carnicero',
    text: 'Llevo 15 años en la carnicería y aprendí técnicas que no sabía. El ahumado casero me cambió el juego.',
  },
]
</script>

<template>
  <section class="testimonials">
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Lo que dicen los que ya están dentro
      </h2>
      <div class="testimonial-grid">
        <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
          <div class="testimonial-header">
            <div class="avatar"><i class="fas fa-user"></i></div>
            <span class="testimonial-name">{{ t.name }}</span>
          </div>
          <p class="testimonial-text">{{ t.text }}</p>
        </div>
      </div>
      <div class="testimonial-cta">
        <a href="#precios" class="btn-primary">Quiero los mismos resultados</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials {
  padding: 4rem 1.5rem;
  background: $paper;
  border-top: 2px solid $border;
  border-bottom: 2px solid $border;
}

.section-inner {
  max-width: 900px;
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

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.testimonial-card {
  background: $white;
  border: 2px solid $ink;
  border-radius: 8px;
  padding: 1.25rem;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: $primary;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.testimonial-name {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 600;
  color: $ink;
}

.testimonial-text {
  font-family: $font-secondary;
  font-size: 0.9rem;
  line-height: 1.6;
  color: $ink-light;
  font-style: italic;

  &::before {
    content: '"';
    color: $primary;
    font-size: 1.2rem;
    font-weight: 700;
  }

  &::after {
    content: '"';
    color: $primary;
    font-size: 1.2rem;
    font-weight: 700;
  }
}

.testimonial-cta {
  text-align: center;
}

.btn-primary {
  display: inline-block;
  background: $primary;
  color: $white;
  padding: 0.85rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-family: $font-mono;
  font-weight: 700;
  font-size: 0.95rem;
  border: 2px solid $primary;
  transition: all 0.2s;

  &:hover {
    background: $accent-red;
    border-color: $accent-red;
  }
}
</style>
