<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="nav-header">
    <div v-if="menuOpen" class="overlay" @click="closeMenu"></div>

    <div class="nav-inner">
      <a href="/" class="logo">
        <img
          src="https://escuelaculinarialavalletto.com/wp-content/uploads/2023/01/logo-lavalletto-2.png"
          alt="Escuela Culinaria Lavalletto"
          class="logo-img"
        />
      </a>

      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menú">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <a href="#recetas" @click="closeMenu"><i class="fas fa-utensils"></i> Recetas</a>
        <a href="#numeros" @click="closeMenu"><i class="fas fa-chart-bar"></i> Números</a>
        <a href="#precios" @click="closeMenu"><i class="fas fa-tag"></i> Precios</a>
        <a href="#faq" @click="closeMenu"><i class="fas fa-question-circle"></i> FAQ</a>
        <a href="/acceso" class="login-link" @click="closeMenu"><i class="fas fa-sign-in-alt"></i> Ya tengo mi pedido</a>
        <a href="#precios" class="cta-btn" @click="closeMenu"><i class="fas fa-cart-shopping"></i> Comprar</a>
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
  border-bottom: 2px solid $ink;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 1rem;
}

.logo {
  display: flex;
  align-items: center;

  .logo-img {
    height: 36px;
    width: auto;
    display: block;
  }
}

/* ───── Overlay (mobile only) ───── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 101;
}

/* ───── Hamburger ───── */
.hamburger {
  position: relative;
  z-index: 103;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    width: 100%;
    height: 2.5px;
    border-radius: 2px;
    background: $ink;
    transition: all 0.25s ease;
  }

  &.open {
    span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
  }
}

/* ───── Nav Links ───── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.35rem;

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

    &:hover { color: $primary; }
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
    transition: background 0.2s;

    &:hover { background: $accent-red; }
  }
}

/* ───── Desktop ───── */
@media (min-width: 769px) {
  .nav-inner {
    height: 64px;
    padding: 0 1.5rem;
  }

  .logo .logo-img {
    height: 44px;
  }

  .hamburger,
  .overlay {
    display: none !important;
  }

  .nav-links {
    gap: 1.5rem;
  }
}

/* ───── Mobile ───── */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: -280px;
    width: 280px;
    height: 100vh;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
    background: $white;
    border-left: 2px solid $ink;
    padding: 5rem 1.5rem 2rem;
    z-index: 102;
    transition: right 0.3s ease;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    overflow-y: auto;

    &.open {
      right: 0;
    }

    a {
      padding: 0.85rem 0;
      font-size: 0.95rem;
      border-bottom: 1px solid $border;

      i { width: 20px; text-align: center; }
    }

    .login-link {
      text-decoration: none;
      color: $primary !important;
      border-bottom: 1px solid $border;
    }

    .cta-btn {
      display: flex;
      justify-content: center;
      padding: 0.85rem;
      border-radius: 6px;
      margin-top: 0.5rem;
      border-bottom: none;
      font-size: 0.95rem;
    }
  }
}
</style>
