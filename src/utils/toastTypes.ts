import 'vue3-toastify/dist/index.css'
import { toast, type ToastType } from 'vue3-toastify'

interface IToast {
  alertType: ToastType
  message: string
}

export const toastComponent = (info: IToast): void => {
  toast(info.message, {
    theme: 'colored',
    type: info.alertType,
    position: 'bottom-right',
    dangerouslyHTMLString: true
  })
}
