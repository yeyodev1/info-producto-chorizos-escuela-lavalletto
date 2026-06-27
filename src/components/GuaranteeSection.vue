<script setup lang="ts">
</script>

<template>
  <section class="guarantee">
    <div class="section-inner">
      <div class="guarantee-box">
        <i class="guarantee-icon fas fa-shield-halved"></i>
        <div class="guarantee-text">
          <h3>30 días de garantía · Sin preguntas</h3>
          <p>Si el máster no cumple con tus expectativas, te devolvemos el 100% de tu dinero. Así de simple.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.guarantee {
  padding: 3rem 1.5rem;
}

.section-inner {
  max-width: 720px;
  margin: 0 auto;
}

.guarantee-box {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.75rem;
  border: 2px solid $alert-success;
  border-radius: 8px;
  background: $white;
}

.guarantee-icon {
  font-size: 2rem;
  color: $alert-success;
}

.guarantee-text {
  h3 {
    font-family: $font-principal;
    font-size: 1.15rem;
    font-weight: 700;
    color: $ink;
    margin-bottom: 0.5rem;
  }

  p {
    font-family: $font-secondary;
    font-size: 0.9rem;
    line-height: 1.6;
    color: $ink-light;
    margin: 0;
  }
}
</style>
