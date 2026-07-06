<script setup lang="ts">
</script>

<template>
  <section class="authority">
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Aprendes viendo el resultado real
      </h2>
      <div class="authority-showcase">
        <figure class="authority-card authority-photo">
          <img
            src="https://res.cloudinary.com/po8gdcqc/image/upload/v1783350867/lavalletto/chorizos-artesanales/diego-con-chorizos-y-un-pana.png"
            alt="Diego Lavalletto con chorizos artesanales terminados"
            class="authority-img"
          />
          <figcaption>Producción real de chorizos artesanales, con panes, especias y piezas listas para servir.</figcaption>
        </figure>
        <div class="authority-copy">
          <span class="authority-kicker">Escuela Culinaria Lavalletto</span>
          <h3>Esto no es un PDF genérico: es una guía para producir con criterio gastronómico.</h3>
          <p>
            Vas a entender ingredientes, punto de carne, especias, embutido, presentación
            y combinaciones para que tus chorizos se vean y sepan como producto profesional.
          </p>
          <ul class="authority-list">
            <li><i class="fas fa-check"></i> Recetas probadas con resultado visible</li>
            <li><i class="fas fa-check"></i> Enfoque artesanal para vender o servir mejor</li>
            <li><i class="fas fa-check"></i> Bonos y comunidad para avanzar acompañado</li>
          </ul>
          <a href="#precios" class="authority-cta">Ver todo lo que incluye <i class="fas fa-arrow-down"></i></a>
        </div>
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

.authority-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 2rem;
  align-items: center;
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

.authority-photo {
  box-shadow: 12px 12px 0 rgba($accent-red, 0.12);
}

.authority-img {
  width: 100%;
  aspect-ratio: 4 / 3.2;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.authority-copy {
  background: $white;
  border: 2px solid $ink;
  border-radius: 12px;
  padding: 1.5rem;
}

.authority-kicker {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 800;
  color: $accent-red;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.authority-copy h3 {
  font-family: $font-principal;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.15;
  color: $ink;
  margin: 0.75rem 0;
}

.authority-copy p {
  font-family: $font-secondary;
  color: $ink-light;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.authority-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: grid;
  gap: 0.65rem;

  li {
    font-family: $font-secondary;
    font-size: 0.92rem;
    color: $ink;
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
  }

  i {
    color: $accent-red;
    margin-top: 0.2rem;
  }
}

.authority-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: $font-mono;
  font-size: 0.9rem;
  font-weight: 800;
  color: $white;
  background: $accent-red;
  border: 2px solid $accent-red;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: $ink;
    border-color: $ink;
  }
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
  .authority-showcase {
    grid-template-columns: 1fr;
  }

  .authority-photo {
    box-shadow: 7px 7px 0 rgba($accent-red, 0.12);
  }
}
</style>
