import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from '@api/auth/[...nextauth]'

import Logged from './Logged'
import Login from './Login'

export default async function Navigation() {
  const session = await getServerSession(authOptions)

  return (
    <nav className='flex items-center justify-between py-8'>
      <Link href='/'>
        <h1 className='text-lg font-bold'>Send It.</h1>
      </Link>

      <ul className='flex items-center gap-6'>
        {!session?.user && <Login />}
        {session?.user && <Logged userImage={session.user.image} />}
      </ul>
    </nav>
  )
}
