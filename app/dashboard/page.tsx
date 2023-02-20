import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import MyPosts from '@components/posts/MyPosts'

import { authOptions } from '@api/auth/[...nextauth]'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <main className='mx-auto max-w-[1000px]'>
      <h1 className='text-2xl'>
        Welcome back <span className='font-bold'>{session.user?.name}</span>
      </h1>

      <MyPosts />
    </main>
  )
}
