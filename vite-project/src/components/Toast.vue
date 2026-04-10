<template>
  <Transition name="fade">
    <div v-if="toastState.show" class="toast-container" :class="toastState.type">
      <div class="toast-content">
        <p>{{ toastState.message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { toastState } from '../store/toast'
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  z-index: 9999;
  min-width: 250px;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-container.error {
  background: #ef4444;
  border-left: 6px solid #b91c1c;
}

.toast-container.success {
  background: #10b981;
  border-left: 6px solid #047857;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>