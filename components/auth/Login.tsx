'use client'

import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <li className='list-none'>
      <button
        className='rounded-md bg-gray-700 py-3 px-6 text-sm text-white disabled:opacity-25'
        onClick={() => signIn('google')}
      >
        Sign In
      </button>
    </li>
  )
}
