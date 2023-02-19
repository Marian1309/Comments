import { Id, ToastOptions, toast } from 'react-toastify'

export const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3500,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark'
}

export const ToastError = (message: string) => {
  return toast.error(message, toastOptions)
}

export const ToastSuccess = (message: string) => {
  return toast.success(message, toastOptions)
}

export const ToastWarn = (message: string) => {
  return toast.warn(message, toastOptions)
}

export const ToastLoading = (message: string) => {
  return toast.loading(message, toastOptions)
}

export const ToastInfo = (message: string) => {
  return toast.info(message, toastOptions)
}

export const ToastDismiss = (toastId: Id) => {
  return toast.dismiss(toastId)
}
