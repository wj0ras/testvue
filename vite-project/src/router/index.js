import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Verifica antes de cada navegação
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true // rota pública, libera

  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    return '/' // não logado → manda pro login
  }

  return true // logado → libera
})

export default router