'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { Id, toast } from 'react-toastify'

import { ToastError, ToastLoading, ToastSuccess } from '@utils'

export default function AddComment({ id }: { id: string }) {
  const [title, setTitle] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async (data: { postId?: string; title: string }) =>
      await axios.post('/api/posts/addComment', { data }),
    {
      onError: (error) => {
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message)
        }
      },
      onSuccess: (data) => {
        setTitle('')
        setIsDisabled(false)
        queryClient.invalidateQueries(['detail-post'])

        ToastSuccess('Toast has been added')
      }
    }
  )
  let addCommentToastId: Id

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisabled(false)
    addCommentToastId = ToastLoading('Adding your comment')
    mutate({ title, postId: id })
    toast.dismiss(addCommentToastId)
  }

  return (
    <form
      className='my-8 mx-auto max-w-[1000px] text-black'
      onSubmit={handleSubmit}
    >
      <h3>Add a comment</h3>

      <div className='my-2 flex flex-col'>
        <input
          type='text'
          name='title'
          value={title}
          className='my-2 rounded-md p-4 text-lg outline-none'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-2'>
        <button
          disabled={isDisabled}
          className=' rounded-xl bg-teal-600 py-2 px-6 text-sm text-white disabled:opacity-25'
          type='submit'
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? 'text-red-700' : 'text-gray-700'
          } `}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  )
}
