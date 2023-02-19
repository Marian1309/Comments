'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { EditPost } from '@components/actions'

const fetchAuthPosts = async () => {
  const { data } = await axios.get('/api/posts/authPosts')
  return data
}

export default function MyPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ['auth-posts'],
    queryFn: fetchAuthPosts
  })

  if (isLoading) {
    return <h1>Posts are loading...</h1>
  }

  return (
    <div className='text-gray-700'>
      {data?.Post?.map((post: any) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}
