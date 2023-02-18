import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { CreatePost } from '@components/actions'

const fetchAllPosts = async () => {
  const { data } = await axios.get('/api/posts/getPosts')
  return data
}

export default function HomePage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchAllPosts
  })

  return (
    <>
      <CreatePost />
    </>
  )
}
