<script setup lang="ts">
interface Recipe {
  name: string
  desc: string
  tag?: string
}

interface Bonus {
  name: string
  items: string[]
}

const recipes: Recipe[] = [
  { name: 'Chorizo Argentino', desc: 'El clásico de la parrilla. Punto de pimentón y carne molida gruesa.', tag: 'NUEVO' },
  { name: 'Chorizo Cuencano', desc: 'Receta tradicional ecuatoriana con achiote y especias andinas.' },
  { name: 'Chorizo Chistorra', desc: 'Embutido fino navarro, ideal para frituras y tapas.', tag: 'NUEVO' },
  { name: 'Chorizo Sarta Rioja', desc: 'El ahumado español con denominación de origen.' },
  { name: 'Chorizo Chipolata', desc: 'Pequeño y versátil. Ternera o cerdo, tú eliges.' },
  { name: 'Frankfurter', desc: 'La salchicha alemana. Textura fina y sabor ahumado.' },
  { name: 'Chorizo Finas Hierbas', desc: 'Romero, tomillo, orégano. Un perfil aromático único.' },
  { name: 'Chorizo Criollo', desc: 'El sabor de la sierra ecuatoriana. Achiote, comino y ajo.' },
  { name: 'Morcilla Artesanal', desc: 'La morcilla de siempre. Cebolla, sangre y especias.' },
  { name: 'Chorizo Cheddar & Jalapeño', desc: 'El moderno. Queso fundido con un toque picante.' },
]

const bonuses: Bonus[] = [
  { name: 'Panes artesanales', items: ['Pan de choripán profesional', 'Pan baguette', 'Pan flauta'] },
  { name: 'Salsas premium', items: ['Salsa chimichurri', 'Salsa pebre', 'Salsa cremosa con semillas de mostaza'] },
  { name: 'Comunidad', items: ['Grupo VIP WhatsApp', 'Sesión Q&A con chefs', 'Directorio de proveedores'] },
]
</script>

<template>
  <section id="recetas" class="recipes">
    <div class="section-inner">
      <h2 class="section-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Fichero de recetas
        <span class="heading-count">10 formulaciones</span>
      </h2>
      <div class="recipe-grid">
        <article v-for="r in recipes" :key="r.name" class="recipe-card">
          <div class="card-header">
            <h3 class="card-title">{{ r.name }}</h3>
            <span v-if="r.tag" class="card-tag">{{ r.tag }}</span>
          </div>
          <p class="card-desc">{{ r.desc }}</p>
          <a href="#" class="card-link">Ver ficha <i class="fas fa-arrow-right"></i></a>
        </article>
      </div>

      <h2 class="section-heading bonus-heading">
        <i class="heading-marker fas fa-chevron-right"></i>
        Bonos incluidos
      </h2>
      <div class="bonus-grid">
        <div v-for="b in bonuses" :key="b.name" class="bonus-card">
          <h3 class="bonus-title">{{ b.name }}</h3>
          <ul class="bonus-list">
            <li v-for="item in b.items" :key="item"><i class="fas fa-chevron-right bonus-bullet"></i> {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.recipes {
  padding: 4rem 1.5rem;
  background: $paper;
}

.section-inner {
  max-width: 1100px;
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

.heading-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: $text-secondary;
  background: rgba($ink, 0.06);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

.bonus-heading {
  margin-top: 4rem;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.recipe-card {
  background: $white;
  border: 2px solid $ink;
  border-radius: 8px;
  padding: 1.25rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-family: $font-principal;
  font-size: 1rem;
  font-weight: 700;
  color: $ink;
}

.card-tag {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  background: $accent-gold;
  color: $ink;
  padding: 0.15rem 0.5rem;
  border-radius: 100px;
  white-space: nowrap;
}

.card-desc {
  font-family: $font-secondary;
  font-size: 0.85rem;
  line-height: 1.5;
  color: $ink-light;
  margin-bottom: 0.75rem;
}

.card-link {
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 600;
  color: $primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.bonus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .bonus-grid {
    grid-template-columns: 1fr;
  }
}

.bonus-card {
  background: $white;
  border: 2px solid $secondary;
  border-radius: 8px;
  padding: 1.25rem;
}

.bonus-title {
  font-family: $font-principal;
  font-size: 1rem;
  font-weight: 700;
  color: $secondary;
  margin-bottom: 0.75rem;
}

.bonus-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-family: $font-secondary;
    font-size: 0.85rem;
    color: $ink-light;
    padding: 0.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .bonus-bullet {
    font-size: 0.65rem;
    color: $primary;
    flex-shrink: 0;
  }
}
</style>
