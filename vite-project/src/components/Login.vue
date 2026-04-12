<template>
  <div class="w-full h-svh flex gap-6 flex-col justify-center items-center bg-[radial-gradient(circle_at_top,_#a8a500,_#6D6A0C,_#578C67)]">
    <div class="title">
      <h1 class="text-5xl font-bold text-white">d<span class="border border-white bg-green-900 px-1">Es</span>pes<span class="border border-white bg-green-900 px-1">As</span></h1>
    </div>
    <img src="../assets/money.png" class="absolute bottom-0 right-0" alt="">
    <img src="../assets/money-two.png" class="absolute bottom-0 left-0" alt="">
    <img src="../assets/quim-mask.png" class="w-64 absolute bottom-0 left-1/2 -translate-x-1/2" alt="">
    <div class="card w-64 md:w-80 lg:w-96">
      <form @submit.prevent="handleLogin" class="form">
        <div class="field">
          <label>E-mail</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="seu@email.com"
          />
        </div>

        <div class="field">
          <label>Senha</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            placeholder="••••••••"
          />
          <div class="field-footer">
            <a href="#">Esqueceu a senha?</a>
          </div>
        </div>

        <button type="submit" class="btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? "Entrando..." : "Entrar" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { supabase } from "../lib/supabase";
import { showToast } from "../store/toast";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;
    showToast("Autenticação com sucesso.", "success");
    router.push("/dashboard");
  } catch {
    showToast("Falha ao entrar. Verifique suas credenciais.", "error");
  } finally {
    loading.value = false;
   
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500&display=swap");
.title {
   font-family: "Barriecito", system-ui;
  font-weight: 400;
  font-style: normal;
}
.card {
  position: relative;
  background: linear-gradient(
    135deg,
    #578C67,
    #507028,
    #173A00
    
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem 2.25rem 2rem;
  backdrop-filter: blur(12px);
}


.logo-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
}
.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-icon svg {
  width: 16px;
  height: 16px;
}
.logo-text {
  font-weight: 600;
  font-size: 15px;
  color: rgb(255, 255, 255);
}

.heading {
  font-family: "Playfair Display", serif;
  font-size: 26px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 6px;
}
.subheading {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.42);
  margin-bottom: 2rem;
}

.field {
  margin-bottom: 1rem;
}
.field label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.842);
  margin-bottom: 7px;
}
.field input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 11px 14px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.88);
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.field input::placeholder {
  color: rgba(255, 255, 255, 0.22);
}
.field input:focus {
  border-color: rgba(99, 102, 241, 0.55);
  background: rgba(99, 102, 241, 0.06);
}
.field-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}
.field-footer a {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}
.field-footer a:hover {
  color: #d1d0d0;
}

.btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 12px;
  background: linear-gradient(135deg, #548308, #babd03);
  border: none;
  border-radius: 10px;
  font-family: "DM Sans", sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.btn:hover {
  opacity: 0.92;
}
.btn:active {
  transform: scale(0.985);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1.5rem 0 1.25rem;
}
.divider span {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.22);
  white-space: nowrap;
}
.divider hr {
  flex: 1;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.social-row {
  display: flex;
  gap: 10px;
}
.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 9px;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.18s;
}
.social-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.88);
}

.footer-text {
  text-align: center;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 1.5rem;
}
.footer-text a {
  color: rgba(99, 102, 241, 0.85);
  text-decoration: none;
  font-weight: 500;
}
.footer-text a:hover {
  color: #818cf8;
}
</style>
