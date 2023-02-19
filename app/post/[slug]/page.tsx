'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { AddComment } from '@components/actions'
import { Spinner } from '@components/icons'
import { Post } from '@components/posts'

interface URL {
  params: {
    slug: string
  }
}

const fetchDetails = async (slug: string) => {
  const { data } = await axios.get(`/api/posts/${slug}`)
  return data
}

export default function PostDetailsPage(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ['detail-post'],
    queryFn: () => fetchDetails(url.params.slug)
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Post
          id={data?.id}
          name={data?.user.name}
          avatar={data?.user.image}
          postTitle={data?.title}
          comments={data?.Comment}
        />
      )}

      <AddComment id={data?.id} />

      {data?.Comment?.map((comment: any) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: 'easeOut' }}
          className='my-6 mx-auto max-w-[1000px] rounded-md bg-white p-8 text-black'
          key={comment.id}
        >
          <div className='flex items-center gap-2'>
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt='avatar'
            />
            <h3 className='font-bold'>{comment?.user?.name}</h3>
            <h2 className='text-sm'>{comment.createdAt}</h2>
          </div>
          <div className='py-4'>{comment.message}</div>
        </motion.div>
      ))}
    </>
  )
}
