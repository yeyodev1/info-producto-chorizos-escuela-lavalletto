<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const imageLoaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
const urgency = ref({ days: 0, hours: 0, minutes: 0 })
let urgencyInterval: ReturnType<typeof setInterval> | null = null

function updateUrgency() {
  const now = new Date()
  const deadline = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  const diff = deadline.getTime() - now.getTime()

  if (diff <= 0) {
    urgency.value = { days: 0, hours: 0, minutes: 0 }
    return
  }

  urgency.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  }
}

onMounted(() => {
  updateUrgency()
  urgencyInterval = setInterval(updateUrgency, 60000)

  if (imgRef.value?.complete) {
    imageLoaded.value = true
  }
})

onUnmounted(() => {
  if (urgencyInterval) clearInterval(urgencyInterval)
})
</script>

<template>
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-content">
        <div class="urgency-strip" aria-live="polite">
          <span class="urgency-label">Valor especial solo este mes</span>
          <span class="urgency-time">
            Termina en <strong>{{ urgency.days }}d {{ urgency.hours }}h {{ urgency.minutes }}m</strong>
          </span>
        </div>
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
          <a href="#precios" class="btn-primary">Quiero conocer la oferta</a>
          <a href="#recetas" class="btn-secondary">Ver recetas</a>
        </div>
        <div class="hero-login-link">
          <a href="/acceso"><i class="fas fa-sign-in-alt"></i> Ya tengo mi pedido — Ingresa aquí</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="image-frame">
          <div v-if="!imageLoaded" class="image-skeleton"></div>
          <img
            ref="imgRef"
            src="https://res.cloudinary.com/po8gdcqc/image/upload/v1783350871/lavalletto/chorizos-artesanales/diego-hero.jpg"
            alt="Chef Diego Lavalletto"
            class="hero-image"
            :class="{ loaded: imageLoaded }"
            @load="imageLoaded = true"
          />
          <div class="image-badge">Chef Diego Lavalletto · Escuela Culinaria</div>
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

.urgency-strip {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  width: fit-content;
  background: rgba($accent-red, 0.09);
  border: 2px solid $accent-red;
  border-radius: 999px;
  color: $ink;
  padding: 0.45rem 0.8rem;
  font-family: $font-mono;
  font-size: 0.78rem;
  font-weight: 800;
}

.urgency-label {
  color: $accent-red;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.urgency-time strong {
  color: $accent-red;
  white-space: nowrap;
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
  max-width: 430px;
  aspect-ratio: 4 / 5;
  border: 2px solid $ink;
  border-radius: 8px;
  overflow: hidden;
  background: $paper;
  position: relative;
}

.image-skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(110deg, $paper 30%, darken($paper, 4%) 50%, $paper 70%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 42% 20%;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease;

  &.loaded {
    opacity: 1;
  }
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

@media (max-width: 640px) {
  .hero {
    padding: 3rem 1rem 2rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-sub {
    font-size: 1rem;
  }

  .urgency-strip {
    align-items: flex-start;
    border-radius: 12px;
    flex-direction: column;
    gap: 0.2rem;
    width: 100%;
  }
}
</style>
