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
  { name: 'Chorizo Argentino', desc: 'El clásico de la parrilla: pimentón, carne molida gruesa y mordida jugosa.', tag: 'Parrilla' },
  { name: 'Chorizo Cuencano', desc: 'Receta tradicional ecuatoriana con achiote, especias andinas y sabor de casa.' },
  { name: 'Chistorra', desc: 'Embutido fino navarro, rápido de cocinar e ideal para tapas o picadas.', tag: 'Tapa' },
  { name: 'Sarta Rioja', desc: 'Perfil español con aroma ahumado, color profundo y curado artesanal.' },
  { name: 'Chipolata', desc: 'Pequeño, versátil y delicado. Perfecto para desayunos, brunch o platos rápidos.' },
  { name: 'Frankfurter', desc: 'Salchicha alemana de textura fina, sabor ahumado y acabado profesional.' },
  { name: 'Finas Hierbas', desc: 'Romero, tomillo y orégano para un chorizo aromático y elegante.' },
  { name: 'Chorizo Criollo', desc: 'Sabor de la sierra ecuatoriana: achiote, comino, ajo y carácter artesanal.' },
  { name: 'Morcilla Artesanal', desc: 'La morcilla de siempre, explicada paso a paso con cebolla y especias.' },
  { name: 'Cheddar & Jalapeño', desc: 'Una versión moderna: queso fundido, punto picante y corte muy comercial.' },
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
      <div class="recipe-showcase">
        <div class="showcase-copy">
          <span class="eyebrow"><i class="fas fa-utensils"></i> Recetas visuales y probadas</span>
          <h2 class="section-heading">
            Chorizos que vas a preparar, servir y vender
          </h2>
          <p class="showcase-text">
            No es solo teoría: cada fórmula está pensada para que veas el resultado final,
            entiendas la textura y puedas replicar embutidos con presentación gastronómica.
          </p>
          <div class="showcase-stats">
            <span>10 formulaciones</span>
            <span>Fotos de referencia</span>
            <span>Paso a paso</span>
          </div>
        </div>
        <figure class="showcase-photo">
          <img src="https://res.cloudinary.com/po8gdcqc/image/upload/v1783350874/lavalletto/chorizos-artesanales/chorizo-recetas.png" alt="Chorizos artesanales preparados" />
          <figcaption>Resultado real: chorizos artesanales listos para servir.</figcaption>
        </figure>
      </div>
      <div class="recipe-grid">
        <article v-for="r in recipes" :key="r.name" class="recipe-card">
          <div class="card-header">
            <h3 class="card-title">{{ r.name }}</h3>
            <span v-if="r.tag" class="card-tag">{{ r.tag }}</span>
          </div>
          <p class="card-desc">{{ r.desc }}</p>
          <a href="#" class="card-link">Ver receta <i class="fas fa-arrow-right"></i></a>
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

.recipe-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
}

.showcase-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eyebrow {
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.section-heading {
  font-family: $font-principal;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900;
  line-height: 1.05;
  color: $ink;
  margin: 0;
}

.showcase-text {
  font-family: $font-secondary;
  font-size: 1rem;
  line-height: 1.7;
  color: $ink-light;
  max-width: 620px;
}

.showcase-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    font-family: $font-mono;
    font-size: 0.78rem;
    font-weight: 700;
    color: $ink;
    background: $white;
    border: 1.5px solid $ink;
    border-radius: 100px;
    padding: 0.35rem 0.75rem;
  }
}

.showcase-photo {
  margin: 0;
  border: 2px solid $ink;
  border-radius: 14px;
  overflow: hidden;
  background: $white;
  box-shadow: 10px 10px 0 rgba($primary, 0.16);

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    display: block;
  }

  figcaption {
    font-family: $font-secondary;
    font-size: 0.82rem;
    color: $ink-light;
    padding: 0.75rem 1rem;
    border-top: 1px solid $border;
  }
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
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, $primary, $accent-gold);
  }

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
  font-size: 1.05rem;
  font-weight: 800;
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

@media (max-width: 760px) {
  .recipe-showcase {
    grid-template-columns: 1fr;
  }

  .showcase-photo {
    box-shadow: 6px 6px 0 rgba($primary, 0.16);
  }
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
