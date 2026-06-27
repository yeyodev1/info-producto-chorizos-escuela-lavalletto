import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Máster en Chorizos Artesanales' },
  },
  {
    path: '/pay-response',
    redirect: (to) => ({ path: '/pago/success', query: to.query }),
  },
  {
    path: '/pago/success',
    name: 'PaymentSuccess',
    component: () => import('../views/PaymentSuccess.vue'),
    meta: { title: 'Pago confirmado' },
  },
  {
    path: '/acceso',
    name: 'Access',
    component: () => import('../views/AccessView.vue'),
    meta: { title: 'Iniciar sesión' },
  },
  {
    path: '/acceso/recuperar',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: { title: 'Recuperar contraseña' },
  },
  {
    path: '/acceso/restablecer',
    name: 'ResetPassword',
    component: () => import('../views/ResetPasswordView.vue'),
    meta: { title: 'Restablecer contraseña' },
  },
  {
    path: '/mi-cuenta',
    component: () => import('../views/account/AccountLayout.vue'),
    meta: { requiresAuth: true },
    redirect: '/mi-cuenta/membresia',
    children: [
      {
        path: 'membresia',
        name: 'Membership',
        component: () => import('../views/account/MembershipSection.vue'),
        meta: { title: 'Mi Membresía' },
      },
      {
        path: 'contenido',
        name: 'Content',
        component: () => import('../views/account/ContentSection.vue'),
        meta: { title: 'Contenido' },
      },
      {
        path: 'pagos',
        name: 'Payments',
        component: () => import('../views/account/PaymentsSection.vue'),
        meta: { title: 'Mis Pagos' },
      },
      {
        path: 'soporte',
        name: 'Support',
        component: () => import('../views/account/SupportSection.vue'),
        meta: { title: 'Soporte' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  const hasToken = !!localStorage.getItem('access_token')
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth)

  if (requiresAuth && !hasToken) {
    return next({ path: '/acceso', replace: true })
  }

  if (to.path === '/acceso' && hasToken) {
    return next({ path: '/mi-cuenta/membresia', replace: true })
  }

  next()
})

export default router
