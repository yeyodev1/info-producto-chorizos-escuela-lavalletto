<script setup lang="ts">
</script>

<template>
  <header class="nav-header">
    <div class="nav-inner">
      <a href="/" class="logo">
        <img
          src="https://escuelaculinarialavalletto.com/wp-content/uploads/2023/01/logo-lavalletto-2.png"
          alt="Escuela Culinaria Lavalletto"
          class="logo-img"
        />
      </a>
      <nav class="nav-links">
        <a href="#recetas"><i class="fas fa-utensils"></i> Recetas</a>
        <a href="#numeros"><i class="fas fa-chart-bar"></i> Números</a>
        <a href="#precios"><i class="fas fa-tag"></i> Precios</a>
        <a href="#faq"><i class="fas fa-question-circle"></i> FAQ</a>
        <a href="/acceso" class="login-link"><i class="fas fa-sign-in-alt"></i> Ya tengo mi pedido</a>
        <a href="#precios" class="cta-btn"><i class="fas fa-cart-shopping"></i> Comprar</a>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.nav-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba($cream, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid $ink;
  padding: 0 1.5rem;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;

  .logo-img {
    height: 44px;
    width: auto;
    display: block;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    text-decoration: none;
    color: $ink-light;
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 500;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.35rem;

    &:hover {
      color: $primary;
    }
  }

  .login-link {
    color: $primary !important;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1.5px;
  }

  .cta-btn {
    background: $primary;
    color: $white !important;
    padding: 0.5rem 1.25rem;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.85rem;
    transition: background 0.2s;

    &:hover {
      background: $accent-red;
    }
  }
}
</style>
