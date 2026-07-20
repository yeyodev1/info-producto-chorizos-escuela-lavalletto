<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { usePayphone } from '../composables/usePayphone'

const { generateClientTransactionId, renderWidget } = usePayphone()

const showPay = ref(false)
const bonuses = [
  {
    title: 'Bono #1 — Panes Artesanales',
    value: '29 USD',
    items: ['Pan de Choripán Profesional', 'Pan de Masa Madre para Pastrami'],
  },
  {
    title: 'Bono #2 — Las 3 Salsas',
    value: '19 USD',
    items: ['Salsa Chimichurri Premium', 'Salsa Especial para Pastrami', 'Salsa Signature para Sándwiches'],
  },
  {
    title: 'Bono #3 — Grupo VIP Choriceros',
    value: '39 USD',
    items: ['Comunidad privada & Networking', 'Compartir resultados', 'Resolver dudas con chefs'],
  },
  {
    title: 'Bono #4 — Sesión Q&A con Chefs',
    value: '49 USD',
    items: ['Preguntas en vivo', 'Correcciones y consejos de producción'],
  },
  {
    title: 'Bono #5 — Directorio de Proveedores',
    value: '27 USD',
    items: ['Tripas, condimentos, equipos', 'Insumos especializados'],
  },
  {
    title: 'Bono #6 — Acceso Preferencial a Charcutería',
    value: '39 USD',
    items: ['Precio especial para alumnos del libro'],
  },
]

const totalValue = 402
const regularPrice = 200
const launchPrice = 97
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
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Máster en Chorizos Artesanales
      </h2>

      <div class="offer-card">
        <div class="offer-badge">🔥 OFERTA DE LANZAMIENTO</div>

        <div class="value-summary">
          <div>
            <span>Valor por separado</span>
            <strong class="price-old">{{ totalValue }} USD</strong>
          </div>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <div>
            <span>Precio habitual</span>
            <strong class="price-was">{{ regularPrice }} USD</strong>
          </div>
        </div>

        <div class="price-block">
          <span class="launch-label">Hoy accedes por</span>
          <p class="price-now">{{ launchPrice }} USD</p>
          <p class="price-sub">Pago único · Acceso de por vida</p>
        </div>

        <div class="urgency-bar">
          <i class="fas fa-tag"></i>
          <span>
            <strong>Precio especial de lanzamiento activo.</strong>
            Luego, el acceso tendrá un precio de {{ regularPrice }} USD.
          </span>
        </div>

        <div class="bonuses-section">
          <h3 class="bonuses-heading">
            <i class="fas fa-gift"></i> Todo esto también está incluido sin costo adicional
          </h3>
          <div class="bonuses-grid">
            <div v-for="b in bonuses" :key="b.title" class="bonus-item">
              <div class="bonus-header">
                <span class="bonus-title">{{ b.title }}</span>
                <span class="bonus-value">{{ b.value }}</span>
              </div>
              <ul class="bonus-list">
                <li v-for="item in b.items" :key="item">
                  <i class="fas fa-check bonus-check"></i> {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button class="cta-btn" @click="selectPlan">
          <i class="fas fa-cart-shopping"></i> Comprar ahora — {{ launchPrice }} USD
        </button>
        <p class="checkout-note"><i class="fas fa-lock"></i> Pago seguro procesado por PayPhone</p>
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
    </div>
  </section>
</template>

<style scoped lang="scss">
.pricing {
  padding: 4rem 1.5rem;
  background: $paper;
  border-top: 2px solid $border;
}

.section-inner {
  max-width: 720px;
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

.offer-card {
  background: $white;
  border: 3px solid $ink;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  position: relative;
}

.offer-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: $accent-red;
  color: $white;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 0.35rem 1.25rem;
  border-radius: 100px;
  white-space: nowrap;
}

.price-block {
  text-align: center;
  margin-bottom: 1.5rem;
}

.value-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin: 0.5rem auto 1.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid $border;

  div {
    text-align: center;
  }

  span,
  strong {
    display: block;
  }

  span {
    margin-bottom: 0.2rem;
    color: $text-secondary;
    font-family: $font-secondary;
    font-size: 0.72rem;
  }

  > i {
    color: $primary;
    font-size: 0.8rem;
  }
}

.price-old {
  font-family: $font-mono;
  font-size: 1.1rem;
  color: $text-secondary;
  text-decoration: line-through;
}

.price-was {
  font-family: $font-mono;
  font-size: 1.1rem;
  color: $alert-error;
  text-decoration: line-through;
}

.launch-label {
  display: block;
  margin-bottom: 0.4rem;
  color: $primary;
  font-family: $font-mono;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.price-now {
  font-family: $font-mono;
  font-size: 3.5rem;
  font-weight: 900;
  color: $ink;
  line-height: 1;
  margin-bottom: 0.35rem;
}

.price-sub {
  font-family: $font-secondary;
  font-size: 0.85rem;
  color: $text-secondary;
}

.urgency-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba($accent-red, 0.08);
  border: 1.5px solid $accent-red;
  border-radius: 6px;
  padding: 0.65rem 1rem;
  margin-bottom: 2rem;

  i {
    color: $accent-red;
    font-size: 0.9rem;
  }

  span {
    font-family: $font-mono;
    font-size: 0.8rem;
    color: $ink;
  }

  strong {
    color: $accent-red;
  }
}

.bonuses-section {
  margin-bottom: 2rem;
}

.bonuses-heading {
  font-family: $font-principal;
  font-size: 1.05rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: $accent-gold;
  }
}

.bonuses-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bonus-item {
  border: 1.5px solid $border;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: $primary;
  }
}

.bonus-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.bonus-title {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 600;
  color: $ink;
}

.bonus-value {
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  color: $primary;
  background: rgba($primary, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.bonus-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-family: $font-secondary;
    font-size: 0.85rem;
    color: $ink-light;
    padding: 0.15rem 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
}

.bonus-check {
  font-size: 0.65rem;
  color: $alert-success;
  flex-shrink: 0;
}

.cta-btn {
  width: 100%;
  background: $primary;
  color: $white;
  border: 2px solid $primary;
  padding: 1rem;
  border-radius: 8px;
  font-family: $font-mono;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: $accent-red;
    border-color: $accent-red;
  }

  &:focus-visible {
    outline: 3px solid $accent-gold;
    outline-offset: 3px;
  }
}

.checkout-note {
  margin-top: 0.75rem;
  color: $text-secondary;
  font-family: $font-secondary;
  font-size: 0.75rem;
  text-align: center;

  i {
    margin-right: 0.25rem;
    color: $alert-success;
  }
}

.payphone-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  z-index: 1000;
  padding: 2rem 1rem;
}

.payphone-modal {
  background: $white;
  border: 3px solid $ink;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 440px;
  position: relative;
  animation: modalIn 0.2s ease-out;
  margin: auto;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

@media (max-width: 560px) {
  .pricing {
    padding-inline: 1rem;
  }

  .offer-card {
    padding: 2.25rem 1rem 1.5rem;
  }

  .offer-badge {
    font-size: 0.62rem;
    letter-spacing: 1px;
  }

  .value-summary {
    gap: 0.75rem;
  }

  .price-now {
    font-size: 3rem;
  }

  .urgency-bar {
    align-items: flex-start;
    text-align: left;
  }

  .bonus-header {
    align-items: flex-start;
    gap: 0.75rem;
  }

  .bonus-value {
    flex-shrink: 0;
  }
}
</style>
