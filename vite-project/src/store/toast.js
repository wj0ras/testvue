import { reactive } from 'vue'

export const toastState = reactive({
  message: '',
  show: false,
  type: 'error'
})

export const showToast = (msg, type = 'error') => {
  toastState.message = msg
  toastState.type = type
  toastState.show = true
  
  setTimeout(() => {
    toastState.show = false
  }, 3000)
}