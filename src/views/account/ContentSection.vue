<script setup lang="ts">
</script>

<template>
  <div class="section-page">
    <div class="hero-card">
      <h1>Biblioteca de Contenido</h1>
      <p>Todo lo que incluye tu membresía</p>
    </div>

    <a href="/pdf/recetas.pdf" class="content-card" target="_blank">
      <div class="content-icon" style="background: #0872a3"><i class="fas fa-file-pdf"></i></div>
      <div class="content-info">
        <h4>10 Recetas Profesionales</h4>
        <p>Guía completa en PDF con técnicas y secretos</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>

    <a href="/pdf/bono-panes.pdf" class="content-card" target="_blank">
      <div class="content-icon" style="background: #d4a017"><i class="fas fa-bread-slice"></i></div>
      <div class="content-info">
        <h4>Bono #1 — Panes Artesanales</h4>
        <p>Maridaje perfecto para tus embutidos</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>

    <a href="/pdf/bono-salsas.pdf" class="content-card" target="_blank">
      <div class="content-icon" style="background: #c0392b"><i class="fas fa-mortar-pestle"></i></div>
      <div class="content-info">
        <h4>Bono #2 — Las 3 Salsas</h4>
        <p>Recetas de acompañamiento artesanal</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>

    <a href="https://chat.whatsapp.com/JHuEdRnd8SRIR7wCYFa07W" class="content-card" target="_blank" rel="noopener noreferrer">
      <div class="content-icon" style="background: #25d366"><i class="fab fa-whatsapp"></i></div>
      <div class="content-info">
        <h4>Bono #3 — Grupo VIP Choriceros</h4>
        <p>Únete a la comunidad de WhatsApp</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>

    <a href="/pdf/bono-qa.pdf" class="content-card" target="_blank">
      <div class="content-icon" style="background: #8e44ad"><i class="fas fa-question-circle"></i></div>
      <div class="content-info">
        <h4>Bono #4 — Sesión Q&A con Chefs</h4>
        <p>Resuelve tus dudas con los expertos</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>

    <a href="/pdf/bono-proveedores.pdf" class="content-card" target="_blank">
      <div class="content-icon" style="background: #e67e22"><i class="fas fa-truck"></i></div>
      <div class="content-info">
        <h4>Bono #5 — Directorio de Proveedores</h4>
        <p>Insumos de calidad para tu producción</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>

    <a href="/pdf/bono-charcuteria.pdf" class="content-card" target="_blank">
      <div class="content-icon" style="background: #07095a"><i class="fas fa-award"></i></div>
      <div class="content-info">
        <h4>Bono #6 — Acceso a Charcutería</h4>
        <p>Nivel avanzado para profesionales</p>
      </div>
      <i class="fas fa-chevron-right content-arrow"></i>
    </a>
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

.content-card {
  display: flex; align-items: center; gap: 0.85rem;
  background: $white; border: 1.5px solid $border; border-radius: 10px;
  padding: 0.9rem 1rem; text-decoration: none; transition: all 0.2s; margin-bottom: 0.5rem;
  &:hover {
    border-color: $primary; box-shadow: 0 2px 12px rgba($primary, 0.1);
    .content-arrow { color: $primary; transform: translateX(3px); }
  }
}
.content-icon {
  width: 40px; height: 40px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  i { font-size: 1rem; color: $white; }
}
.content-info {
  flex: 1; min-width: 0;
  h4 { font-family: $font-principal; font-size: 0.85rem; font-weight: 700; color: $ink; margin-bottom: 0.1rem; }
  p { font-family: $font-secondary; font-size: 0.75rem; color: $text-secondary; }
}
.content-arrow { font-size: 0.75rem; color: $border; transition: all 0.2s; flex-shrink: 0; }
</style>
