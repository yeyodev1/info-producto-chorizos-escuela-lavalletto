<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { usePayphone } from '../composables/usePayphone'

const { generateClientTransactionId, renderWidget } = usePayphone()

const showPay = ref(false)
const bonuses = [
  {
    title: 'Bono #1 — Panes Artesanales',
    value: '29 USD',
    icon: 'fa-bread-slice',
    items: ['Pan de Choripán Profesional', 'Pan de Masa Madre para Pastrami'],
  },
  {
    title: 'Bono #2 — Las 3 Salsas',
    value: '19 USD',
    icon: 'fa-pepper-hot',
    items: ['Salsa Chimichurri Premium', 'Salsa Especial para Pastrami', 'Salsa Signature para Sándwiches'],
  },
  {
    title: 'Bono #3 — Grupo VIP Choriceros',
    value: '39 USD',
    icon: 'fa-users',
    items: ['Comunidad privada & Networking', 'Compartir resultados', 'Resolver dudas con chefs'],
  },
  {
    title: 'Bono #4 — Sesión Q&A con Chefs',
    value: '49 USD',
    icon: 'fa-person-chalkboard',
    items: ['Preguntas en vivo', 'Correcciones y consejos de producción'],
  },
  {
    title: 'Bono #5 — Directorio de Proveedores',
    value: '27 USD',
    icon: 'fa-book',
    items: ['Tripas, condimentos, equipos', 'Insumos especializados'],
  },
  {
    title: 'Bono #6 — Acceso Preferencial a Charcutería',
    value: '39 USD',
    icon: 'fa-star',
    items: ['Precio especial para alumnos del libro'],
  },
]

const totalValue = 402
const regularPrice = 200
const launchPrice = 97
const savings = totalValue - launchPrice
const launchPriceCents = 9700

function closeModal() {
  showPay.value = false
}

async function selectPlan() {
  showPay.value = true
  await nextTick()
  await loadPayphoneSDK()
  const clientTxId = generateClientTransactionId()
  renderWidget(
    'pp-button',
    launchPriceCents,
    launchPriceCents,
    clientTxId,
    'Chorizos-Maestro',
  )
}

function loadPayphoneSDK(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).PPaymentButtonBox) {
      resolve()
      return
    }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.js'
    script.type = 'module'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      console.error('Error al cargar SDK de Payphone')
      resolve()
    }
    document.head.appendChild(script)
  })
}
</script>

<template>
  <section id="precios" class="pricing">
    <div class="pricing-bg-decor" aria-hidden="true"></div>

    <div class="section-inner">
      <div class="section-header">
        <span class="section-tag">Inversión</span>
        <h2 class="section-heading">Máster en Chorizos Artesanales</h2>
        <p class="section-sub">Todo lo que necesitas para dominar la producción artesanal</p>
      </div>

      <div class="offer-card">
        <div class="offer-badge">
          🔥 OFERTA DE LANZAMIENTO
        </div>

        <div class="value-rail">
          <div class="value-item">
            <span class="value-label">Valor por separado</span>
            <span class="value-number old">{{ totalValue }} USD</span>
          </div>
          <div class="value-divider">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="value-item">
            <span class="value-label">Precio habitual</span>
            <span class="value-number was">{{ regularPrice }} USD</span>
          </div>
          <div class="savings-badge">
            <span>Ahorras</span>
            <strong>{{ savings }} USD</strong>
          </div>
        </div>

        <div class="price-block">
          <div class="price-ribbon">Hoy accedes por</div>
          <div class="price-display">
            <span class="price-symbol">$</span>
            <span class="price-number">{{ launchPrice }}</span>
            <span class="price-currency">USD</span>
          </div>
          <p class="price-note">Pago único · Acceso de por vida</p>
        </div>

        <button class="cta-btn" @click="selectPlan">
          <span class="cta-content">
            <span class="cta-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span>Comprar ahora — <strong>{{ launchPrice }} USD</strong></span>
          </span>
        </button>

        <div class="urgency-bar">
          <div class="urgency-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span><strong>Precio especial de lanzamiento activo.</strong> Luego subirá a {{ regularPrice }} USD.</span>
        </div>

        <div class="bonuses-section">
          <div class="bonuses-header">
            <div class="bonuses-dots">
              <span></span><span></span><span></span>
            </div>
            <h3 class="bonuses-heading">Incluye 6 bonos exclusivos</h3>
            <div class="bonuses-dots">
              <span></span><span></span><span></span>
            </div>
          </div>

          <div class="bonuses-grid">
            <div v-for="b in bonuses" :key="b.title" class="bonus-card">
              <div class="bonus-card-accent"></div>
              <div class="bonus-card-body">
                <div class="bonus-top">
                  <div class="bonus-icon-wrapper">
                    <i :class="['fas', b.icon]"></i>
                  </div>
                  <span class="bonus-value-tag">{{ b.value }}</span>
                </div>
                <h4 class="bonus-title">{{ b.title }}</h4>
                <ul class="bonus-list">
                  <li v-for="item in b.items" :key="item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="bonus-check-icon">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-footer">
          <button class="cta-btn large" @click="selectPlan">
            <span class="cta-content">
              <span class="cta-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span>Comprar ahora — <strong>{{ launchPrice }} USD</strong></span>
            </span>
          </button>
          <p class="checkout-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" stroke-width="2"/></svg>
            Pago seguro procesado por PayPhone
          </p>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showPay" class="payphone-overlay" @click.self="closeModal">
        <div class="payphone-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
          <button class="modal-x" aria-label="Cerrar ventana de pago" @click="closeModal">&times;</button>
          <h3 id="payment-title" class="modal-title">Finalizar pago</h3>
          <p class="modal-plan">Máster en Chorizos Artesanales — {{ launchPrice }} USD</p>
          <div id="pp-button" class="pp-button-container"></div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
.pricing {
  position: relative;
  padding: 6rem 1.5rem;
  background: linear-gradient(165deg, $ink 0%, #0c0e3a 50%, #0a1a3a 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% -20%, rgba($primary, 0.12) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 80% 90%, rgba($accent-gold, 0.06) 0%, transparent 60%);
    pointer-events: none;
  }
}

.pricing-bg-decor {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba($white, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba($white, 0.02) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.section-inner {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-tag {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.3rem 1rem;
  border-radius: 100px;
  background: rgba($white, 0.08);
  border: 1px solid rgba($white, 0.1);
  color: rgba($white, 0.7);
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-heading {
  font-family: $font-principal;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  line-height: 1.05;
  color: $white;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.section-sub {
  font-family: $font-secondary;
  font-size: 1.05rem;
  color: rgba($white, 0.55);
  max-width: 500px;
  margin: 0 auto;
}

.offer-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba($white, 0.06) 0%,
    rgba($white, 0.03) 50%,
    rgba($white, 0.06) 100%
  );
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba($white, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
}

.offer-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, $accent-red, #e74c3c);
  color: $white;
  font-family: $font-mono;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  padding: 0.4rem 1.5rem;
  border-radius: 100px;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba($accent-red, 0.35);
}

.value-rail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba($white, 0.08);
  flex-wrap: wrap;
}

.value-item {
  text-align: center;

  .value-label {
    display: block;
    margin-bottom: 0.25rem;
    color: rgba($white, 0.45);
    font-family: $font-secondary;
    font-size: 0.72rem;
  }
}

.value-number {
  font-family: $font-mono;
  font-size: 1.2rem;
  font-weight: 700;

  &.old {
    color: rgba($white, 0.3);
    text-decoration: line-through;
  }

  &.was {
    color: rgba($accent-red, 0.6);
    text-decoration: line-through;
  }
}

.value-divider {
  color: rgba($white, 0.15);
  display: flex;
}

.savings-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba($accent-green, 0.15), rgba($accent-green, 0.06));
  border: 1px solid rgba($accent-green, 0.2);

  span {
    color: rgba($white, 0.55);
    font-family: $font-secondary;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  strong {
    color: $accent-green;
    font-family: $font-mono;
    font-size: 0.95rem;
    font-weight: 800;
  }
}

.price-block {
  text-align: center;
  margin-bottom: 1.75rem;
}

.price-ribbon {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.25rem 1rem;
  background: rgba($primary, 0.15);
  border: 1px solid rgba($primary, 0.25);
  border-radius: 100px;
  color: $primary-light;
  font-family: $font-mono;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.price-symbol {
  font-family: $font-mono;
  font-size: 1.8rem;
  font-weight: 700;
  color: rgba($white, 0.5);
  align-self: flex-start;
  margin-top: 0.35rem;
}

.price-number {
  font-family: $font-principal;
  font-size: clamp(4rem, 8vw, 5.5rem);
  font-weight: 900;
  color: $white;
  line-height: 1;
  letter-spacing: -0.03em;
  text-shadow: 0 0 60px rgba($primary, 0.3);
}

.price-currency {
  font-family: $font-mono;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba($white, 0.5);
  align-self: flex-start;
  margin-top: 0.6rem;
}

.price-note {
  color: rgba($white, 0.45);
  font-family: $font-secondary;
  font-size: 0.9rem;
}

.urgency-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: 2.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 100px;
  background: rgba($accent-red, 0.1);
  border: 1px solid rgba($accent-red, 0.15);

  .urgency-icon {
    display: flex;
    color: $accent-red;
    opacity: 0.8;
  }

  span {
    color: rgba($white, 0.75);
    font-family: $font-mono;
    font-size: 0.78rem;
  }

  strong {
    color: $accent-red;
  }
}

.bonuses-section {
  margin-bottom: 2rem;
}

.bonuses-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.bonuses-heading {
  font-family: $font-principal;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba($white, 0.9);
  white-space: nowrap;
}

.bonuses-dots {
  display: flex;
  gap: 4px;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba($white, 0.15);
  }
}

.bonuses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
}

.bonus-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.06);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: rgba($white, 0.07);
    border-color: rgba($primary, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
}

.bonus-card-accent {
  height: 3px;
  background: linear-gradient(90deg, $primary, $accent-gold, $primary);
  opacity: 0.3;
}

.bonus-card:hover .bonus-card-accent {
  opacity: 1;
}

.bonus-card-body {
  padding: 1.25rem 1.25rem 1.1rem;
}

.bonus-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.65rem;
}

.bonus-icon-wrapper {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba($primary, 0.12);
  color: $primary-light;
  font-size: 0.85rem;
}

.bonus-value-tag {
  font-family: $font-mono;
  font-size: 0.72rem;
  font-weight: 700;
  color: $accent-green;
  padding: 0.2rem 0.55rem;
  border-radius: 100px;
  background: rgba($accent-green, 0.1);
  border: 1px solid rgba($accent-green, 0.15);
}

.bonus-title {
  font-family: $font-mono;
  font-size: 0.82rem;
  font-weight: 600;
  color: $white;
  margin-bottom: 0.6rem;
}

.bonus-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-family: $font-secondary;
    font-size: 0.8rem;
    color: rgba($white, 0.55);
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }
}

.bonus-check-icon {
  flex-shrink: 0;
  color: $accent-green;
  opacity: 0.6;
}

.cta-footer {
  text-align: center;
}

.cta-btn {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, $primary, #0a5a8a);
  color: $white;
  border: none;
  padding: 1.1rem;
  border-radius: 12px;
  font-family: $font-mono;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 30%, rgba($white, 0.08) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba($primary, 0.4);
    background: linear-gradient(135deg, darken($primary, 4%), darken(#0a5a8a, 4%));

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid $accent-gold;
    outline-offset: 3px;
  }

  &.large {
    max-width: 480px;
    margin: 0 auto;
  }
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  position: relative;
  z-index: 1;

  strong {
    color: $accent-gold;
  }
}

.cta-icon {
  display: flex;
  opacity: 0.8;
}

.checkout-note {
  margin-top: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba($white, 0.35);
  font-family: $font-secondary;
  font-size: 0.72rem;
}

.payphone-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  z-index: 1000;
  padding: 2rem 1rem;
  backdrop-filter: blur(4px);
}

.payphone-modal {
  background: $white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 440px;
  position: relative;
  animation: modalIn 0.25s ease-out;
  margin: auto;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-x {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: $ink-light;
  line-height: 1;
  padding: 0;

  &:hover {
    color: $ink;
  }

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 3px;
  }
}

.modal-title {
  font-family: $font-principal;
  font-size: 1.25rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.35rem;
}

.modal-plan {
  font-family: $font-mono;
  font-size: 0.85rem;
  color: $primary;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.pp-button-container {
  min-height: 60px;
  width: 100%;
}

@media (max-width: 640px) {
  .pricing {
    padding: 4rem 1rem;
  }

  .offer-card {
    padding: 2.5rem 1.25rem 1.5rem;
  }

  .offer-badge {
    font-size: 0.6rem;
    letter-spacing: 1.2px;
    padding: 0.35rem 1rem;
  }

  .value-rail {
    gap: 0.65rem;
    padding-bottom: 1.5rem;
  }

  .value-number {
    font-size: 1rem;
  }

  .savings-badge {
    padding: 0.25rem 0.65rem;

    strong {
      font-size: 0.85rem;
    }
  }

  .bonuses-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .bonus-card-body {
    padding: 1rem;
  }

  .urgency-bar {
    border-radius: 10px;
    padding: 0.65rem 1rem;
    align-items: flex-start;
    text-align: left;
  }

  .cta-btn {
    font-size: 0.95rem;
    padding: 1rem;
  }

  .section-heading {
    font-size: clamp(1.8rem, 6vw, 2.2rem);
  }
}
</style>
