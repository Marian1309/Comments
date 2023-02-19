'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { EditPost } from '@components/actions'

import { PostType } from '@types'

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
      {data?.Post?.map((post: PostType) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  )
}
