import { PluginOptions, useToast } from 'vue-toastification'

export const ToastOptions: PluginOptions = {
  transition: 'Vue-Toastification__fade'
}

export const notify = (message: string, type: string, options?) => {
  const toast = useToast()

  toast[type](
    message,
    options || {
      timeout: 2000
    }
  )
}
