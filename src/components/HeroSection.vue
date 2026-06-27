<script setup lang="ts">
</script>

<template>
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-content">
        <div class="badge-row">
          <span class="badge">+2,140 alumnos</span>
          <span class="badge">4.8/5 estrellas</span>
          <span class="badge">pago único</span>
          <span class="badge">sin experiencia</span>
        </div>
        <h1 class="hero-title">
          De aficionado a
          <span class="highlight">productor artesanal</span>
        </h1>
        <p class="hero-sub">
          Olvida las suscripciones caras. Aprende a fabricar embutidos artesanales
          desde cero con recetas probadas, soporte VIP y una comunidad activa.
        </p>
        <div class="hero-ctas">
          <a href="#precios" class="btn-primary">Lo quiero · $97 USD</a>
          <a href="#recetas" class="btn-secondary">Ver recetas</a>
        </div>
        <div class="hero-login-link">
          <a href="/acceso"><i class="fas fa-sign-in-alt"></i> Ya tengo mi pedido — Ingresa aquí</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="image-frame">
          <img
            src="/assets/archivo_004.png"
            alt="Chorizos artesanales"
            class="hero-image"
          />
          <div class="image-badge">Producto artesanal ecuatoriano</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border: 1.5px solid $ink;
  border-radius: 100px;
  background: $white;
  color: $ink;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-title {
  font-family: $font-principal;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.1;
  color: $ink;
  margin: 0;
}

.highlight {
  color: $primary;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba($primary, 0.3);
    border-radius: 2px;
  }
}

.hero-sub {
  font-family: $font-secondary;
  font-size: 1.1rem;
  line-height: 1.7;
  color: $ink-light;
  max-width: 480px;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
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

.btn-secondary {
  background: transparent;
  color: $ink;
  padding: 0.85rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-family: $font-mono;
  font-weight: 600;
  font-size: 0.95rem;
  border: 2px solid $ink;
  transition: all 0.2s;

  &:hover {
    background: $ink;
    color: $white;
  }
}

.hero-login-link {
  a {
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $primary;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    opacity: 0.85;
    transition: opacity 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;

    &:hover {
      opacity: 1;
    }
  }
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.image-frame {
  width: 100%;
  max-width: 480px;
  border: 2px solid $ink;
  border-radius: 8px;
  overflow: hidden;
  background: $paper;
  position: relative;
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
}

.image-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($ink, 0.85);
  color: $white;
  font-family: $font-mono;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  text-align: center;
  letter-spacing: 0.5px;
}
</style>
