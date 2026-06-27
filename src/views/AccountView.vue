<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()

const user = ref<{ email: string; transactionId: number; clientTransactionId: string } | null>(null)
const payments = ref<any[]>([])
const loading = ref(true)
const error = ref('')

const sections = [
  { id: 'membership', label: 'Mi Membresía', icon: 'fa-crown' },
  { id: 'content', label: 'Contenido', icon: 'fa-book-open' },
  { id: 'payments', label: 'Mis Pagos', icon: 'fa-receipt' },
  { id: 'support', label: 'Soporte', icon: 'fa-headset' },
] as const

type SectionId = typeof sections[number]['id']
const activeSection = ref<SectionId>('membership')

const showMobileSidebar = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    router.push('/acceso')
    return
  }
  try {
    const [userData, paymentsData] = await Promise.all([
      authService.me(),
      authService.getMyPayments().catch(() => []),
    ])
    user.value = userData
    payments.value = paymentsData
  } catch {
    localStorage.removeItem('access_token')
    router.push('/acceso')
  } finally {
    loading.value = false
  }
})

function logout() {
  localStorage.removeItem('access_token')
  router.push('/acceso')
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const statusLabel = computed(() => {
  const count = payments.value.length
  return count === 1 ? '1 pago realizado' : `${count} pagos realizados`
})
</script>

<template>
  <div class="dashboard">
    <!-- Mobile overlay -->
    <div v-if="showMobileSidebar" class="sidebar-overlay" @click="showMobileSidebar = false"></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: showMobileSidebar }">
      <div class="sidebar-brand">
        <div class="brand-icon">
          <i class="fas fa-utensils"></i>
        </div>
        <span class="brand-name">Mi Cuenta</span>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="s in sections"
          :key="s.id"
          class="nav-item"
          :class="{ active: activeSection === s.id }"
          @click="activeSection = s.id; showMobileSidebar = false"
        >
          <i :class="['fas', s.icon]"></i>
          <span>{{ s.label }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item logout" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
        <div class="sidebar-user" v-if="user">
          <div class="user-avatar">{{ user.email.charAt(0).toUpperCase() }}</div>
          <div class="user-info">
            <span class="user-email">{{ user.email }}</span>
            <span class="user-status">Membresía activa</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="main">
      <!-- Top bar mobile -->
      <div class="topbar">
        <button class="hamburger" @click="showMobileSidebar = true">
          <i class="fas fa-bars"></i>
        </button>
        <span class="topbar-title">{{ sections.find(s => s.id === activeSection)?.label }}</span>
        <div class="topbar-spacer"></div>
      </div>

      <div class="content">
        <!-- Loading -->
        <div v-if="loading" class="state-box">
          <i class="fas fa-circle-notch fa-spin fa-3x"></i>
          <p>Cargando tu cuenta...</p>
        </div>

        <template v-else-if="user">

          <!-- ═══ MEMBERSHIP ═══ -->
          <div v-if="activeSection === 'membership'" class="section-page">

            <div class="hero-card">
              <div class="hero-greeting">
                <h1>¡Bienvenido, Choricero!</h1>
                <p>Tu pasión por los embutidos artesanales ya está en marcha</p>
              </div>
              <div class="hero-email">{{ user.email }}</div>
            </div>

            <div class="card membership-card">
              <div class="card-header">
                <i class="fas fa-crown"></i>
                <span>Máster en Chorizos Artesanales</span>
                <div class="badge-active">
                  <i class="fas fa-check-circle"></i>
                  Activo
                </div>
              </div>
              <div class="card-body">
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Acceso</span>
                    <span class="info-value">Completo de por vida</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Transacción</span>
                    <span class="info-value mono">#{{ user.transactionId }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Código</span>
                    <span class="info-value mono small">{{ user.clientTransactionId }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Estado</span>
                    <span class="info-value">
                      <span class="dot dot-green"></span>
                      {{ statusLabel }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header secondary">
                <i class="fas fa-chart-line"></i>
                <span>Progreso</span>
              </div>
              <div class="card-body">
                <div class="progress-item">
                  <div class="progress-top">
                    <span>Bienvenida completada</span>
                    <span class="progress-pct">100%</span>
                  </div>
                  <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
                </div>
                <div class="progress-item">
                  <div class="progress-top">
                    <span>Recetas profesionales</span>
                    <span class="progress-pct">0%</span>
                  </div>
                  <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                </div>
              </div>
            </div>

          </div>

          <!-- ═══ CONTENT ═══ -->
          <div v-if="activeSection === 'content'" class="section-page">

            <div class="hero-card alt">
              <h1>Biblioteca de Contenido</h1>
              <p>Todo lo que incluye tu membresía</p>
            </div>

            <a href="/pdf/recetas.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #0872a3">
                <i class="fas fa-file-pdf"></i>
              </div>
              <div class="content-info">
                <h4>10 Recetas Profesionales</h4>
                <p>Guía completa en PDF con técnicas y secretos</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>

            <a href="/pdf/bono-panes.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #d4a017">
                <i class="fas fa-bread-slice"></i>
              </div>
              <div class="content-info">
                <h4>Bono #1 — Panes Artesanales</h4>
                <p>Maridaje perfecto para tus embutidos</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>

            <a href="/pdf/bono-salsas.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #c0392b">
                <i class="fas fa-mortar-pestle"></i>
              </div>
              <div class="content-info">
                <h4>Bono #2 — Las 3 Salsas</h4>
                <p>Recetas de acompañamiento artesanal</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>

            <a href="/pdf/bono-vip.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #27ae60">
                <i class="fas fa-users"></i>
              </div>
              <div class="content-info">
                <h4>Bono #3 — Grupo VIP Choriceros</h4>
                <p>Comunidad exclusiva en redes</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>

            <a href="/pdf/bono-qa.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #8e44ad">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="content-info">
                <h4>Bono #4 — Sesión Q&A con Chefs</h4>
                <p>Resuelve tus dudas con los expertos</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>

            <a href="/pdf/bono-proveedores.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #e67e22">
                <i class="fas fa-truck"></i>
              </div>
              <div class="content-info">
                <h4>Bono #5 — Directorio de Proveedores</h4>
                <p>Insumos de calidad para tu producción</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>

            <a href="/pdf/bono-charcuteria.pdf" class="content-card" target="_blank">
              <div class="content-icon" style="background: #07095a">
                <i class="fas fa-award"></i>
              </div>
              <div class="content-info">
                <h4>Bono #6 — Acceso a Charcutería</h4>
                <p>Nivel avanzado para profesionales</p>
              </div>
              <i class="fas fa-chevron-right content-arrow"></i>
            </a>
          </div>

          <!-- ═══ PAYMENTS ═══ -->
          <div v-if="activeSection === 'payments'" class="section-page">

            <div class="hero-card alt">
              <h1>Mis Pagos</h1>
              <p>{{ payments.length === 0 ? 'Aún no tienes pagos registrados' : `Historial de ${payments.length} pago(s)` }}</p>
            </div>

            <div v-if="payments.length === 0" class="empty-state">
              <i class="fas fa-receipt"></i>
              <p>No hay pagos registrados</p>
            </div>

            <div v-for="p in payments" :key="p.transactionId" class="payment-card">
              <div class="payment-left">
                <div class="payment-icon" :class="p.transactionStatus === 'Approved' ? 'success' : 'pending'">
                  <i :class="p.transactionStatus === 'Approved' ? 'fas fa-check' : 'fas fa-clock'"></i>
                </div>
                <div class="payment-info">
                  <span class="payment-amount">{{ formatAmount(p.amount, p.currency) }}</span>
                  <span class="payment-date">{{ formatDate(p.date) }}</span>
                </div>
              </div>
              <div class="payment-right">
                <span class="payment-badge" :class="p.transactionStatus === 'Approved' ? 'approved' : 'other'">
                  {{ p.transactionStatus === 'Approved' ? 'Aprobado' : p.transactionStatus }}
                </span>
                <span class="payment-id">#{{ p.transactionId }}</span>
              </div>
            </div>
          </div>

          <!-- ═══ SUPPORT ═══ -->
          <div v-if="activeSection === 'support'" class="section-page">

            <div class="hero-card alt">
              <h1>¿Necesitas ayuda?</h1>
              <p>Estamos aquí para ti</p>
            </div>

            <a href="mailto:soporte@lavalletto.com" class="support-card">
              <div class="support-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="support-info">
                <h4>Correo electrónico</h4>
                <p>soporte@lavalletto.com</p>
              </div>
              <i class="fas fa-chevron-right"></i>
            </a>

            <a href="https://wa.me/593995254965" class="support-card" target="_blank">
              <div class="support-icon" style="background: #25d366">
                <i class="fab fa-whatsapp"></i>
              </div>
              <div class="support-info">
                <h4>WhatsApp</h4>
                <p>Respuesta rápida</p>
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
            </div>
          </div>

        </template>

        <div v-else-if="error" class="state-box">
          <i class="fas fa-exclamation-triangle"></i>
          <p>{{ error }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
/* ───────── Layout ───────── */
.dashboard {
  display: flex;
  min-height: 100vh;
  background: $cream;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 98;
}

/* ───────── Sidebar ───────── */
.sidebar {
  width: 260px;
  background: $white;
  border-right: 2px solid $border;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  z-index: 99;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1.5rem 1.25rem 1.25rem;
  border-bottom: 1px solid $border;
}

.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, $primary, $primary-dark);
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.brand-name {
  font-family: $font-principal;
  font-size: 1rem;
  font-weight: 800;
  color: $ink;
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-family: $font-secondary;
  font-size: 0.85rem;
  font-weight: 500;
  color: $ink-light;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  width: 100%;

  i {
    width: 18px;
    text-align: center;
    font-size: 0.9rem;
  }

  &:hover {
    background: $cream;
    color: $ink;
  }

  &.active {
    background: rgba($primary, 0.08);
    color: $primary;
    font-weight: 700;
  }

  &.logout {
    color: $text-secondary;
    margin-top: auto;

    &:hover {
      color: $alert-error;
      background: rgba($alert-error, 0.06);
    }
  }
}

.sidebar-footer {
  border-top: 1px solid $border;
  padding: 0.85rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $primary;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.user-email {
  font-family: $font-mono;
  font-size: 0.7rem;
  color: $ink;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-status {
  font-family: $font-secondary;
  font-size: 0.6rem;
  color: $alert-success;
  font-weight: 600;
}

/* ───────── Top bar (mobile) ───────── */
.topbar {
  display: none;
  align-items: center;
  padding: 0.85rem 1rem;
  background: $white;
  border-bottom: 1px solid $border;
  position: sticky;
  top: 0;
  z-index: 10;
}

.hamburger {
  border: none;
  background: transparent;
  font-size: 1.15rem;
  color: $ink;
  cursor: pointer;
  padding: 0.25rem;
}

.topbar-title {
  font-family: $font-principal;
  font-size: 0.95rem;
  font-weight: 700;
  color: $ink;
  margin-left: 0.75rem;
}

.topbar-spacer {
  flex: 1;
}

/* ───────── Main Content ───────── */
.main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

.content {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.state-box {
  text-align: center;
  padding: 4rem 2rem;
  color: $ink-light;
  font-family: $font-secondary;

  i { margin-bottom: 1rem; color: $primary; }
  p { margin-bottom: 1.25rem; }
}

.section-page {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ───────── Hero Card ───────── */
.hero-card {
  background: linear-gradient(135deg, $primary, $primary-dark);
  border-radius: 12px;
  padding: 1.75rem;
  margin-bottom: 1.25rem;
  color: $white;

  h1 {
    font-family: $font-principal;
    font-size: 1.35rem;
    font-weight: 800;
    margin-bottom: 0.3rem;
  }

  p {
    font-family: $font-secondary;
    font-size: 0.85rem;
    opacity: 0.85;
    margin-bottom: 0.75rem;
  }

  &.alt {
    background: $white;
    border: 2px solid $border;
    color: $ink;

    p { color: $text-secondary; }
  }
}

.hero-email {
  display: inline-block;
  font-family: $font-mono;
  font-size: 0.7rem;
  background: rgba(255,255,255,0.15);
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
}

/* ───────── Cards ───────── */
.card {
  background: $white;
  border: 1.5px solid $border;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid $border;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 700;
  color: $ink-light;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  i { color: $primary; font-size: 0.8rem; }

  &.secondary i { color: $accent-gold; }
}

.badge-active {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: $white;
  background: $alert-success;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;

  i { font-size: 0.55rem; color: $white; }
}

.card-body {
  padding: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-label {
  font-family: $font-mono;
  font-size: 0.6rem;
  color: $text-secondary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-family: $font-principal;
  font-size: 0.9rem;
  font-weight: 700;
  color: $ink;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  &.mono { font-family: $font-mono; font-size: 0.8rem; }
  &.small { font-size: 0.7rem; font-weight: 600; word-break: break-all; }
}

.dot {
  width: 8px; height: 8px; border-radius: 50%; display: inline-block;
  &-green { background: $alert-success; }
}

/* ───────── Progress ───────── */
.progress-item {
  margin-bottom: 1rem;

  &:last-child { margin-bottom: 0; }
}

.progress-top {
  display: flex;
  justify-content: space-between;
  font-family: $font-secondary;
  font-size: 0.8rem;
  color: $ink-light;
  margin-bottom: 0.35rem;
}

.progress-pct {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 700;
  color: $text-secondary;
}

.progress-bar {
  height: 6px;
  background: $cream;
  border-radius: 100px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $primary, lighten($primary, 15%));
  border-radius: 100px;
  transition: width 0.4s ease;
}

/* ───────── Content Cards ───────── */
.content-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: $white;
  border: 1.5px solid $border;
  border-radius: 10px;
  padding: 0.9rem 1rem;
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 0.5rem;

  &:hover {
    border-color: $primary;
    box-shadow: 0 2px 12px rgba($primary, 0.1);

    .content-arrow { color: $primary; transform: translateX(3px); }
  }
}

.content-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i { font-size: 1rem; color: $white; }
}

.content-info {
  flex: 1;
  min-width: 0;

  h4 {
    font-family: $font-principal;
    font-size: 0.85rem;
    font-weight: 700;
    color: $ink;
    margin-bottom: 0.1rem;
  }

  p {
    font-family: $font-secondary;
    font-size: 0.75rem;
    color: $text-secondary;
  }
}

.content-arrow {
  font-size: 0.75rem;
  color: $border;
  transition: all 0.2s;
  flex-shrink: 0;
}

/* ───────── Payment Cards ───────── */
.payment-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  border: 1.5px solid $border;
  border-radius: 10px;
  padding: 1rem 1.15rem;
  margin-bottom: 0.5rem;
  transition: all 0.15s;

  &:hover { border-color: $primary-light; }
}

.payment-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.payment-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  i { font-size: 0.85rem; color: $white; }

  &.success { background: $alert-success; }
  &.pending { background: $alert-warning; }
}

.payment-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.payment-amount {
  font-family: $font-principal;
  font-size: 0.95rem;
  font-weight: 800;
  color: $ink;
}

.payment-date {
  font-family: $font-secondary;
  font-size: 0.7rem;
  color: $text-secondary;
}

.payment-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

.payment-badge {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.2rem 0.55rem;
  border-radius: 100px;

  &.approved { background: rgba($alert-success, 0.12); color: $alert-success; }
  &.other { background: rgba($alert-warning, 0.12); color: $alert-warning; }
}

.payment-id {
  font-family: $font-mono;
  font-size: 0.65rem;
  color: $text-secondary;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: $text-secondary;
  font-family: $font-secondary;

  i { font-size: 2rem; margin-bottom: 0.75rem; color: $border; }
  p { font-size: 0.9rem; }
}

/* ───────── Support ───────── */
.support-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: $white;
  border: 1.5px solid $border;
  border-radius: 10px;
  padding: 1rem 1.1rem;
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 0.5rem;

  .support-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i { font-size: 1.1rem; color: $white; }
  }

  .support-info {
    flex: 1;
    h4 { font-family: $font-principal; font-size: 0.85rem; font-weight: 700; color: $ink; margin-bottom: 0.1rem; }
    p { font-family: $font-secondary; font-size: 0.75rem; color: $text-secondary; }
  }

  i:last-child { font-size: 0.75rem; color: $border; transition: all 0.2s; }

  &:hover {
    border-color: $primary;
    box-shadow: 0 2px 12px rgba($primary, 0.08);
    i:last-child { color: $primary; transform: translateX(3px); }
  }
}

.faq-card {
  background: $white;
  border: 1.5px solid $border;
  border-radius: 10px;
  padding: 1.25rem;
  margin-top: 0.5rem;

  h4 {
    font-family: $font-principal;
    font-size: 0.85rem;
    font-weight: 700;
    color: $ink;
    margin-bottom: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    i { color: $primary; }
  }
}

.faq-item {
  margin-bottom: 0.85rem;

  &:last-child { margin-bottom: 0; }
}

.faq-q {
  font-family: $font-secondary;
  font-size: 0.8rem;
  font-weight: 600;
  color: $ink;
  margin-bottom: 0.2rem;
}

.faq-a {
  font-family: $font-secondary;
  font-size: 0.75rem;
  color: $text-secondary;
  line-height: 1.5;
}

/* ───────── Responsive ───────── */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    transition: left 0.25s ease;
    box-shadow: 4px 0 24px rgba(0,0,0,0.1);

    &.open {
      left: 0;
    }
  }

  .sidebar-overlay {
    display: block;
  }

  .topbar {
    display: flex;
  }

  .content {
    padding: 1.25rem 1rem 2rem;
  }

  .info-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
}
</style>
