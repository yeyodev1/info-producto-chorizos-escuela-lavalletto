<script setup lang="ts">
</script>

<template>
  <section class="authority">
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Autoridad y respaldo
      </h2>
      <p class="authority-sub">Avalado por la Escuela Culinaria Lavalletto y productores artesanales</p>
      <div class="authority-grid">
        <figure class="authority-card">
          <img
            src="/assets/archivo_004.png"
            alt="Producto artesanal"
            class="authority-img"
          />
          <figcaption>Recetas tradicionales ecuatorianas</figcaption>
        </figure>
        <figure class="authority-card">
          <img
            src="/assets/carnes_premium.png"
            alt="Carnes premium"
            class="authority-img"
          />
          <figcaption>Carnes premium seleccionadas</figcaption>
        </figure>
        <figure class="authority-card">
          <img
            src="/assets/chef.png"
            alt="Chef Lavalletto"
            class="authority-img"
          />
          <figcaption>Chef Diego Lavalletto</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.authority {
  padding: 4rem 1.5rem;
  background: $paper;
  border-top: 2px solid $border;
  border-bottom: 2px solid $border;
}

.section-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.section-heading {
  font-family: $font-mono;
  font-size: 1.3rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.heading-marker {
  color: $primary;
}

.authority-sub {
  font-family: $font-secondary;
  font-size: 0.95rem;
  color: $ink-light;
  margin-bottom: 2rem;
}

.authority-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.authority-card {
  margin: 0;
  border: 2px solid $ink;
  border-radius: 8px;
  overflow: hidden;
  background: $white;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
}

.authority-img {
  width: 100%;
  height: auto;
  display: block;
}

figcaption {
  font-family: $font-mono;
  font-size: 0.8rem;
  color: $ink-light;
  padding: 0.75rem 1rem;
  text-align: center;
  border-top: 1px solid $border;
}

@media (max-width: 640px) {
  .authority-grid {
    grid-template-columns: 1fr;
  }
}
</style>
