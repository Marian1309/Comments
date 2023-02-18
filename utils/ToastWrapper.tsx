import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}
