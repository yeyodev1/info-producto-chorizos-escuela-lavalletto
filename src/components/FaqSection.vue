<script setup lang="ts">
const faqs = [
  {
    q: '¿Es una suscripción mensual?',
    a: 'No. Es pago único. Pagas una vez y accedes al contenido de por vida. Sin cuotas recurrentes, sin sorpresas.',
  },
  {
    q: '¿Necesito conocimientos previos?',
    a: 'Para nada. El máster está diseñado desde cero. Si sabes cocinar un huevo, puedes hacer chorizos artesanales.',
  },
  {
    q: '¿Qué incluye el grupo VIP de WhatsApp?',
    a: 'Acceso directo a una comunidad de productores artesanales y chefs que resuelven dudas, compran insumos juntos y comparten sus creaciones.',
  },
  {
    q: '¿Cómo recibo el contenido después de comprar?',
    a: 'Inmediatamente después del pago recibirás un enlace de descarga con todos los materiales y la invitación al grupo de WhatsApp.',
  },
  {
    q: '¿Hay garantía?',
    a: '30 días. Si no te sirve, te devolvemos tu dinero sin preguntas. No hay riesgo.',
  },
]
</script>

<template>
  <section id="faq" class="faq">
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Preguntas frecuentes
      </h2>
      <div class="faq-list">
        <details v-for="(item, i) in faqs" :key="i" class="faq-item">
          <summary class="faq-q">
            <i class="faq-icon fas fa-question"></i>
            {{ item.q }}
          </summary>
          <div class="faq-a">{{ item.a }}</div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 2px solid $ink;
  border-radius: 8px;
  background: $white;
  overflow: hidden;
}

.faq-q {
  font-family: $font-mono;
  font-size: 0.95rem;
  font-weight: 600;
  color: $ink;
  padding: 1rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    background: rgba($cream, 0.5);
  }
}

.faq-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: $cream;
  border: 1.5px solid $ink;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: $ink;
  flex-shrink: 0;
}

.faq-a {
  font-family: $font-secondary;
  font-size: 0.9rem;
  line-height: 1.6;
  color: $ink-light;
  padding: 0 1.25rem 1rem 1.25rem;
}
</style>
