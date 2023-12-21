import 'vue3-toastify/dist/index.css'
import { toast, type ToastType } from 'vue3-toastify'

export const toastComponent = (alertType: ToastType, message: string): void => {
  toast(message, {
    theme: 'colored',
    type: alertType,
    position: 'bottom-right',
    dangerouslyHTMLString: true
  })
}
