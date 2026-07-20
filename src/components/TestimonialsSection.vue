<template>
  <section class="testimonials">
    <div class="section-inner">
      <div class="section-intro">
        <span class="eyebrow"><i class="fas fa-circle-play"></i> Experiencias reales</span>
        <h2 class="section-heading">El conocimiento se nota cuando llega al plato</h2>
        <p class="section-copy">
          Una alumna cuenta cómo aplicó lo aprendido y sorprendió a sus propios clientes
          con preparaciones que percibieron como comida gourmet.
        </p>
      </div>

      <article class="featured-testimonial">
        <div class="video-frame">
          <video
            controls
            playsinline
            preload="metadata"
            poster="https://res.cloudinary.com/po8gdcqc/video/upload/so_2,f_jpg,q_auto,w_900/v1784564975/lavalletto/chorizos-artesanales/testimonio-1.jpg"
            aria-label="Testimonio en video de una alumna de la Escuela Culinaria Lavalletto"
          >
            <source
              src="https://res.cloudinary.com/po8gdcqc/video/upload/q_auto:good,f_mp4/v1784564975/lavalletto/chorizos-artesanales/testimonio-1.mp4"
              type="video/mp4"
            />
            Tu navegador no puede reproducir este video.
          </video>
          <span class="video-duration"><i class="fas fa-play"></i> 28 segundos</span>
        </div>

        <div class="testimonial-copy">
          <span class="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            A mis clientes les hice una velouté y se quedaron realmente sorprendidos.
            Después, con el pollo agridulce, dijeron: “¡Guau, estamos comiendo comida gourmet!”.
            Me sentí realmente halagada por todos los conocimientos que he aprendido en mi escuela.
          </blockquote>
          <div class="testimonial-author">
            <span class="author-icon"><i class="fas fa-user-check"></i></span>
            <div>
              <strong>Alumna de Lavalletto</strong>
              <span>Testimonio grabado en la escuela</span>
            </div>
          </div>
        </div>
      </article>

      <figure class="student-result">
        <img
          src="https://res.cloudinary.com/po8gdcqc/image/upload/f_auto,q_auto,w_1100/v1784564974/lavalletto/chorizos-artesanales/amigos-con-chorizo.jpg"
          alt="Alumno y chef de Lavalletto mostrando chorizos artesanales recién elaborados"
          loading="lazy"
        />
        <figcaption>
          <span><i class="fas fa-certificate"></i> Aprender haciendo</span>
          <strong>De la técnica al resultado: producción artesanal guiada por chefs.</strong>
        </figcaption>
      </figure>

      <div class="testimonial-cta">
        <a href="#precios" class="btn-primary">Quiero aprender estas técnicas</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials {
  padding: 4rem 1.5rem;
  background: $paper;
  border-top: 2px solid $border;
  border-bottom: 2px solid $border;
}

.section-inner {
  max-width: 1040px;
  margin: 0 auto;
}

.section-intro {
  max-width: 720px;
  margin-bottom: 2rem;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: $primary;
  font-family: $font-mono;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-heading {
  font-family: $font-principal;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.08;
  color: $ink;
  margin-bottom: 0.75rem;
}

.section-copy {
  color: $ink-light;
  font-family: $font-secondary;
  font-size: 1rem;
  line-height: 1.7;
}

.featured-testimonial {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) minmax(320px, 1.2fr);
  background: $ink;
  border: 2px solid $ink;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 10px 10px 0 rgba($primary, 0.18);
  margin-bottom: 3rem;
}

.video-frame {
  position: relative;
  min-height: 460px;
  background: #101010;

  video {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 460px;
    object-fit: cover;
  }
}

.video-duration {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.65rem;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.75);
  color: $white;
  font-family: $font-mono;
  font-size: 0.68rem;
  font-weight: 700;
  pointer-events: none;
}

.testimonial-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 3.5rem);
  color: $white;

  blockquote {
    position: relative;
    z-index: 1;
    margin: 0 0 2rem;
    font-family: $font-principal;
    font-size: clamp(1.2rem, 2.4vw, 1.65rem);
    font-weight: 700;
    line-height: 1.5;
  }
}

.quote-mark {
  position: absolute;
  top: 0.5rem;
  right: 2rem;
  color: rgba($accent-gold, 0.22);
  font-family: Georgia, serif;
  font-size: 10rem;
  line-height: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  strong,
  span {
    display: block;
  }

  strong {
    font-family: $font-mono;
    font-size: 0.85rem;
  }

  span {
    margin-top: 0.15rem;
    color: rgba($white, 0.7);
    font-family: $font-secondary;
    font-size: 0.78rem;
  }
}

.author-icon {
  display: grid !important;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
  background: $primary;
  color: $white;
}

.student-result {
  display: grid;
  grid-template-columns: minmax(280px, 1.1fr) minmax(260px, 0.9fr);
  align-items: center;
  margin: 0 0 2.5rem;
  border: 2px solid $ink;
  border-radius: 14px;
  overflow: hidden;
  background: $white;

  img {
    display: block;
    width: 100%;
    height: 360px;
    object-fit: cover;
    object-position: center 42%;
  }

  figcaption {
    padding: 2rem;

    span,
    strong {
      display: block;
    }

    span {
      margin-bottom: 0.65rem;
      color: $primary;
      font-family: $font-mono;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    strong {
      color: $ink;
      font-family: $font-principal;
      font-size: 1.4rem;
      line-height: 1.3;
    }
  }
}

.testimonial-cta {
  text-align: center;
}

.btn-primary {
  display: inline-block;
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

  &:focus-visible {
    outline: 3px solid $accent-gold;
    outline-offset: 3px;
  }
}

@media (max-width: 760px) {
  .featured-testimonial,
  .student-result {
    grid-template-columns: 1fr;
  }

  .featured-testimonial {
    box-shadow: 6px 6px 0 rgba($primary, 0.18);
  }

  .video-frame,
  .video-frame video {
    min-height: 520px;
  }

  .student-result img {
    height: 340px;
  }
}
</style>
