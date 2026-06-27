<script setup lang="ts">
</script>

<template>
  <section class="story">
    <div class="section-inner">
      <div class="story-card">
        <h2 class="story-title">Te voy a ser sincero.</h2>
        <p class="story-text">
          Por años creí que necesitaba software caro, suscripciones mensuales y
          equipos industriales para hacer embutidos de calidad.
          <strong>Estaba atado a un modelo que me costaba más de lo que vendía.</strong>
        </p>
        <p class="story-text">
          Un día descubrí que <strong>el secreto no está en la herramienta,
          está en la técnica.</strong> Las mismas recetas que usan los productores
          artesanales de toda la vida se pueden hacer con ingredientes accesibles
          y procesos simples.
        </p>
        <p class="story-text">
          Este máster es todo lo que aprendí en el camino: 10 recetas probadas,
          técnicas de atado, cocción y ahumado, y una comunidad que te respalda
          cuando algo sale mal.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.story {
  padding: 3rem 1.5rem;
  background: $paper;
  border-top: 2px solid $border;
  border-bottom: 2px solid $border;
}

.section-inner {
  max-width: 720px;
  margin: 0 auto;
}

.story-card {
  padding: 2rem;
  border: 2px solid $ink;
  border-radius: 8px;
  background: $white;
}

.story-title {
  font-family: $font-mono;
  font-size: 1.5rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 1.5rem;
}

.story-text {
  font-family: $font-secondary;
  font-size: 1.05rem;
  line-height: 1.8;
  color: $ink-light;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: $ink;
    font-weight: 700;
    background: rgba($primary, 0.08);
    padding: 0.1rem 0.3rem;
    border-radius: 2px;
  }
}
</style>
