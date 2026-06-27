<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../../services/authService'

const router = useRouter()
const route = useRoute()

const user = ref<{ email: string; transactionId: number; clientTransactionId: string } | null>(null)
const payments = ref<any[]>([])
const loading = ref(true)

const sections = [
  { path: '/mi-cuenta/membresia', label: 'Mi Membresía', icon: 'fa-crown' },
  { path: '/mi-cuenta/contenido', label: 'Contenido', icon: 'fa-book-open' },
  { path: '/mi-cuenta/pagos', label: 'Mis Pagos', icon: 'fa-receipt' },
  { path: '/mi-cuenta/soporte', label: 'Soporte', icon: 'fa-headset' },
]

const showMobileSidebar = ref(false)
const showLogoutModal = ref(false)

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
  showLogoutModal.value = true
}

function confirmLogout() {
  localStorage.removeItem('access_token')
  showLogoutModal.value = false
  router.push('/acceso')
}

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="dashboard">
    <div v-if="showMobileSidebar" class="sidebar-overlay" @click="showMobileSidebar = false"></div>

    <aside class="sidebar" :class="{ open: showMobileSidebar }">
      <div class="sidebar-brand">
        <div class="brand-icon"><i class="fas fa-utensils"></i></div>
        <span class="brand-name">Mi Cuenta</span>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="s in sections"
          :key="s.path"
          class="nav-item"
          :class="{ active: isActive(s.path) }"
          @click="router.push(s.path); showMobileSidebar = false"
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

    <main class="main">
      <div class="topbar">
        <button class="hamburger" @click="showMobileSidebar = true">
          <i class="fas fa-bars"></i>
        </button>
        <span class="topbar-title">{{ sections.find(s => isActive(s.path))?.label }}</span>
        <div class="topbar-spacer"></div>
      </div>

      <div class="content" v-if="!loading">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" :user="user" :payments="payments" />
          </transition>
        </router-view>
      </div>

      <div v-else class="state-box">
        <i class="fas fa-circle-notch fa-spin fa-3x"></i>
        <p>Cargando tu cuenta...</p>
      </div>
    </main>

    <!-- Logout Modal -->
    <Teleport to="body">
      <div v-if="showLogoutModal" class="modal-overlay" @click="showLogoutModal = false">
        <div class="modal-card" @click.stop>
          <div class="modal-icon"><i class="fas fa-sign-out-alt"></i></div>
          <h3>Cerrar sesión</h3>
          <p>¿Estás seguro de que deseas salir de tu cuenta?</p>
          <div class="modal-actions">
            <button class="modal-btn cancel" @click="showLogoutModal = false">Cancelar</button>
            <button class="modal-btn confirm" @click="confirmLogout">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
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
  width: 36px; height: 36px;
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
  padding: 0.75rem;
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

  i { width: 18px; text-align: center; font-size: 0.9rem; }

  &:hover { background: $cream; color: $ink; }

  &.active {
    background: rgba($primary, 0.08);
    color: $primary;
    font-weight: 700;
  }

  &.logout {
    color: $text-secondary;
    &:hover { color: $alert-error; background: rgba($alert-error, 0.06); }
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
  width: 32px; height: 32px;
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

/* Topbar mobile */
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
  border: none; background: transparent;
  font-size: 1.15rem; color: $ink; cursor: pointer; padding: 0.25rem;
}

.topbar-title {
  font-family: $font-principal;
  font-size: 0.95rem; font-weight: 700; color: $ink;
  margin-left: 0.75rem;
}

.topbar-spacer { flex: 1; }

/* Main */
.main { flex: 1; min-width: 0; overflow-y: auto; }

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
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Logout Modal */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
  animation: fadeIn 0.15s ease;
}

.modal-card {
  background: $white;
  border: 2px solid $ink;
  border-radius: 14px;
  padding: 2rem 2rem 1.5rem;
  max-width: 360px;
  width: 90%;
  text-align: center;
  animation: scaleIn 0.2s ease;
}

@keyframes scaleIn {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-icon {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba($alert-error, 0.1);
  color: $alert-error;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
  i { font-size: 1.25rem; }
}

.modal-card h3 {
  font-family: $font-principal;
  font-size: 1.1rem;
  font-weight: 700;
  color: $ink;
  margin-bottom: 0.4rem;
}

.modal-card p {
  font-family: $font-secondary;
  font-size: 0.85rem;
  color: $text-secondary;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 0.6rem;
}

.modal-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  border: 1.5px solid;

  &.cancel {
    background: transparent;
    color: $ink-light;
    border-color: $border;
    &:hover { background: $cream; border-color: $ink-light; }
  }

  &.confirm {
    background: $alert-error;
    color: $white;
    border-color: $alert-error;
    &:hover { background: darken($alert-error, 8%); border-color: darken($alert-error, 8%); }
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    transition: left 0.25s ease;
    box-shadow: 4px 0 24px rgba(0,0,0,0.1);
    &.open { left: 0; }
  }
  .sidebar-overlay { display: block; }
  .topbar { display: flex; }
  .content { padding: 1.25rem 1rem 2rem; }
}
</style>
