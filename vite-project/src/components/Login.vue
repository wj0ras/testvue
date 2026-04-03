<template>

    <div class="card w-64 md:w-80 lg:w-96">

      <form @submit.prevent="handleLogin" class="form">
        <div class="field">
          <label>E-mail</label>
          <input v-model="email" type="email" required placeholder="seu@email.com" />
        </div>

        <div class="field">
          <label>Senha</label>
          <input v-model="password" type="password" required placeholder="••••••••" />
          <div class="field-footer">
            <a href="#">Esqueceu a senha?</a>
          </div>
        </div>

        <button type="submit" class="btn" :disabled="loading">
          <span v-if="loading" class="spinner" />
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

    </div>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

      
const handleLogin = async () => {
  loading.value = true
  try {
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error) throw error

    router.push('/dashboard')

  } catch {
    alert('Erro ao fazer login')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500&display=swap');


.card {
  position: relative;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  padding: 2.5rem 2.25rem 2rem;
  backdrop-filter: blur(12px);
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02), rgba(99,102,241,0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
}
.logo-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.logo-icon svg { width: 16px; height: 16px; }
.logo-text {
  font-weight: 600;
  font-size: 15px;
  color: rgba(255,255,255,0.9);
}

.heading {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 6px;
}
.subheading {
  font-size: 13.5px;
  color: rgba(255,255,255,0.42);
  margin-bottom: 2rem;
}

.field { margin-bottom: 1rem; }
.field label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  margin-bottom: 7px;
}
.field input {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  padding: 11px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: rgba(255,255,255,0.88);
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.field input::placeholder { color: rgba(255,255,255,0.22); }
.field input:focus {
  border-color: rgba(99,102,241,0.55);
  background: rgba(99,102,241,0.06);
}
.field-footer { display: flex; justify-content: flex-end; margin-top: 6px; }
.field-footer a {
  font-size: 12px;
  color: rgba(99,102,241,0.8);
  text-decoration: none;
}
.field-footer a:hover { color: #818cf8; }

.btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 12px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.btn:hover { opacity: 0.92; }
.btn:active { transform: scale(0.985); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.divider {
  display: flex; align-items: center; gap: 10px;
  margin: 1.5rem 0 1.25rem;
}
.divider span {
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  white-space: nowrap;
}
.divider hr {
  flex: 1; border: none;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.social-row { display: flex; gap: 10px; }
.social-btn {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 9px 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 9px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  color: rgba(255,255,255,0.6);
  transition: all 0.18s;
}
.social-btn:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.88);
}

.footer-text {
  text-align: center;
  font-size: 12.5px;
  color: rgba(255,255,255,0.3);
  margin-top: 1.5rem;
}
.footer-text a {
  color: rgba(99,102,241,0.85);
  text-decoration: none;
  font-weight: 500;
}
.footer-text a:hover { color: #818cf8; }
</style>