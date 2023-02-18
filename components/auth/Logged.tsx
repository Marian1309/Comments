'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

interface LoggedProps {
  userImage: string | null | undefined
}

export default function Logged({ userImage }: LoggedProps) {
  const handleExit = () => {
    signOut()
  }

  return (
    <li className='flex items-center gap-8'>
      <button
        className='rounded-md bg-gray-700 px-6 py-3 text-sm text-white'
        onClick={handleExit}
      >
        Sign Out
      </button>

      <Link href='/dashboard'>
        {userImage && (
          <Image alt='user image' height={64} src={userImage} width={64} />
        )}
      </Link>
    </li>
  )
}
