<script setup lang="ts">
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-links">
        <a href="#"><i class="fas fa-shield-halved"></i> Privacidad</a>
        <a href="#"><i class="fas fa-file-contract"></i> Términos</a>
        <a href="#"><i class="fas fa-cookie-bite"></i> Cookies</a>
        <a href="#"><i class="fas fa-gavel"></i> Aviso legal</a>
      </div>
      <p class="footer-copy">© 2026 Escuela Culinaria Lavalletto · Máster en Chorizos Artesanales</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  padding: 2rem 1.5rem;
  border-top: 2px solid $ink;
  background: $ink;
}

.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;

  a {
    font-family: $font-mono;
    font-size: 0.8rem;
    color: rgba($white, 0.6);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.35rem;

    &:hover {
      color: $primary;
    }
  }
}

.footer-copy {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: rgba($white, 0.4);
  margin: 0;
}
</style>
