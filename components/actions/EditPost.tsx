import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Id } from 'react-toastify'

import { ToastDismiss, ToastError, ToastLoading, ToastSuccess } from '@utils'

import Toggle from './Toggle'

interface EditProps {
  id: string
  avatar: string
  name: string
  title: string
  comments?: {
    id: string
    postId: string
    userId: string
  }[]
}

export default function EditPost({ avatar, name, title, id }: EditProps) {
  const [toggle, setToggle] = useState<boolean>(false)
  const queryClient = useQueryClient()
  let deleteToastId: Id

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onError: () => {
        ToastDismiss(deleteToastId)
        ToastError('Error while deleting this post')
      },
      onSuccess: () => {
        ToastDismiss(deleteToastId)
        queryClient.invalidateQueries(['auth-posts'])
        ToastSuccess('Post has benn deleted')
      }
    }
  )

  const deletePost = () => {
    deleteToastId = ToastLoading('Deleting your post')
    mutate(id)
  }

  return (
    <>
      <div className='my-8 rounded-lg bg-white p-8'>
        <div className='flex items-center gap-2'>
          <Image width={32} height={32} src={avatar} alt='avatar' />
          <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>

        <div className='my-8'>
          <p className='break-all'>{title}</p>
        </div>

        <div className='flex items-center gap-4'>
          <p className='text-sm font-bold text-gray-700'>
            {Comment?.length} Comments
          </p>

          <button
            className='text-sm font-bold text-red-500'
            onClick={() => setToggle(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  )
}
