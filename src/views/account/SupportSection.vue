<script setup lang="ts">
</script>

<template>
  <div class="section-page">
    <div class="hero-card">
      <h1>¿Necesitas ayuda?</h1>
      <p>Estamos aquí para ti</p>
    </div>

    <a href="mailto:soporte@lavalletto.com" class="support-card">
      <div class="support-icon"><i class="fas fa-envelope"></i></div>
      <div class="support-info">
        <h4>Correo electrónico</h4>
        <p>soporte@lavalletto.com</p>
      </div>
      <i class="fas fa-chevron-right"></i>
    </a>

    <a href="https://wa.me/593981069295" class="support-card" target="_blank">
      <div class="support-icon" style="background: #25d366"><i class="fab fa-whatsapp"></i></div>
      <div class="support-info">
        <h4>WhatsApp</h4>
        <p>098 106 9295</p>
      </div>
      <i class="fas fa-chevron-right"></i>
    </a>

    <div class="faq-card">
      <h4><i class="fas fa-question-circle"></i> Preguntas frecuentes</h4>
      <div class="faq-item">
        <p class="faq-q">¿Cómo accedo a los PDFs?</p>
        <p class="faq-a">Ve a la sección Contenido y haz clic en cada recurso para descargarlo.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">¿Cómo recupero mi contraseña?</p>
        <p class="faq-a">Usa la opción "Olvidé mi contraseña" en la página de inicio de sesión.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">¿Qué incluye mi membresía?</p>
        <p class="faq-a">Acceso de por vida al Máster en Chorizos Artesanales, incluyendo recetas, bonos y comunidad VIP.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-page { animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.hero-card {
  background: $white; border: 2px solid $border; border-radius: 12px; padding: 1.75rem; margin-bottom: 1.25rem;
  h1 { font-family: $font-principal; font-size: 1.35rem; font-weight: 800; color: $ink; margin-bottom: 0.3rem; }
  p { font-family: $font-secondary; font-size: 0.85rem; color: $text-secondary; }
}

.support-card {
  display: flex; align-items: center; gap: 0.85rem;
  background: $white; border: 1.5px solid $border; border-radius: 10px;
  padding: 1rem 1.1rem; text-decoration: none; transition: all 0.2s; margin-bottom: 0.5rem;

  .support-icon {
    width: 40px; height: 40px; border-radius: 8px;
    background: $primary; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    i { font-size: 1.1rem; color: $white; }
  }
  .support-info {
    flex: 1;
    h4 { font-family: $font-principal; font-size: 0.85rem; font-weight: 700; color: $ink; margin-bottom: 0.1rem; }
    p { font-family: $font-secondary; font-size: 0.75rem; color: $text-secondary; }
  }
  i:last-child { font-size: 0.75rem; color: $border; transition: all 0.2s; }
  &:hover {
    border-color: $primary; box-shadow: 0 2px 12px rgba($primary, 0.08);
    i:last-child { color: $primary; transform: translateX(3px); }
  }
}

.faq-card {
  background: $white; border: 1.5px solid $border; border-radius: 10px; padding: 1.25rem; margin-top: 0.5rem;
  h4 {
    font-family: $font-principal; font-size: 0.85rem; font-weight: 700; color: $ink;
    margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.4rem;
    i { color: $primary; }
  }
}
.faq-item { margin-bottom: 0.85rem; &:last-child { margin-bottom: 0; } }
.faq-q { font-family: $font-secondary; font-size: 0.8rem; font-weight: 600; color: $ink; margin-bottom: 0.2rem; }
.faq-a { font-family: $font-secondary; font-size: 0.75rem; color: $text-secondary; line-height: 1.5; }
</style>
