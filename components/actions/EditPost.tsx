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

export default function EditPost({
  avatar,
  name,
  title,
  id,
  comments
}: EditProps) {
  const [toggle, setToggle] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [commentExists, setCommentExists] = useState<boolean>(false)
  const [commentModalToggle, setCommentModalToggle] = useState<boolean>(false)
  let deleteToastId: Id
  let deleteAllCommentsId: Id

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onError: () => {
        ToastDismiss(deleteToastId)
        ToastError('Error while deleting this post')
        setCommentExists(true)
      },
      onSuccess: () => {
        ToastDismiss(deleteToastId)
        queryClient.invalidateQueries(['auth-posts'])
        ToastSuccess('Post has been deleted')
      }
    }
  )

  const { mutate: commentsMutate } = useMutation(
    async (id: string) =>
      await axios.delete('/api/posts/deleteComment', { data: id }),
    {
      onError: () => {
        ToastDismiss(deleteAllCommentsId)
        ToastError('Error while deleting comments')
        setCommentModalToggle(false)
      },
      onSuccess: () => {
        ToastDismiss(deleteAllCommentsId)
        queryClient.invalidateQueries(['auth-posts'])
        ToastSuccess('Comments have been deleted')
      }
    }
  )

  const deletePost = () => {
    deleteToastId = ToastLoading('Deleting your post')
    mutate(id)
  }

  const deleteComments = () => {
    deleteAllCommentsId = ToastLoading('Deleting comments')
    commentsMutate(id)
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
            {comments?.length} Comments
          </p>
          |
          <button
            className='text-sm font-bold text-red-500'
            onClick={() => setToggle(true)}
          >
            Delete
          </button>
          |
          <button
            className='text-sm font-bold text-red-500'
            onClick={() => setCommentModalToggle(true)}
          >
            Delete all comments
          </button>
        </div>
      </div>

      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}

      {commentExists && (
        <div className='fixed left-0 top-0 z-20 h-full w-full bg-black/50'>
          <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-white p-12'>
            <h2 className='text-[16px]'>Your post has comments 🙂</h2>

            <h3 className='text-sm text-red-600'>
              if you want to delete a post entirely, you need to press a button
              with text -Delete all comments-
            </h3>

            <button
              className='rounded-md bg-red-600 py-2 px-4 text-sm text-white transition-colors hover:bg-red-500'
              onClick={() => setCommentExists(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {commentModalToggle && (
        <div
          className='fixed left-0 top-0 z-20 h-full w-full bg-black/50'
          onClick={() => setCommentModalToggle(false)}
        >
          <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-white p-12'>
            <h3 className='text-sm text-red-600'>
              if you want to delete all comments, press the button below
            </h3>

            <button
              className='rounded-md bg-red-600 py-2 px-4 text-sm text-white transition-colors hover:bg-red-500'
              onClick={deleteComments}
            >
              Delete all comments
            </button>
          </div>
        </div>
      )}
    </>
  )
}
