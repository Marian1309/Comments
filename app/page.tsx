'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { CreatePost } from '@components/actions'
import { Spinner } from '@components/icons'
import { Posts } from '@components/posts'

import { PostType } from '@types'

const fetchAllPosts = async () => {
  const { data } = await axios.get('/api/posts/getPosts')
  return data
}

export default function HomePage() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: fetchAllPosts
  })

  return (
    <>
      <CreatePost />

      {isLoading ? <Spinner /> : <Posts data={data} />}
    </>
  )
}
