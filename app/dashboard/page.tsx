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
    <main className='m-w-[1000px] mx-auto'>
      <h1 className='text-2xl font-bold'>Welcome back {session.user?.name}</h1>

      <MyPosts />
    </main>
  )
}
