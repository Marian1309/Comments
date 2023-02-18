'use client'

import { useMutation } from '@tanstack/react-query'
import { ToastError, ToastLoading, ToastSuccess } from '@utils'
import axios, { AxiosError } from 'axios'
import clsx from 'clsx'
import { FormEvent, useState } from 'react'
import { Id, toast } from 'react-toastify'

export default function CreatePost() {
  const [title, setTitle] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  // const queryClient = useQueryClient()
  let toastId: Id

  // Craete a post
  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post('/api/posts/createPost', { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          ToastError(error?.response?.data.message)
        }
        setIsDisabled(false)
      },
      onSuccess: () => {
        toast.dismiss(toastId)
        ToastSuccess('Post has been made 🎉')
        // queryClient.invalidateQueries()
        setTitle('')
        setIsDisabled(false)
      }
    }
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toastId = ToastLoading('Creating your post')
    setIsDisabled(true)
    mutate(title)
  }

  return (
    <form
      className='my-8 mx-auto max-w-[1000px] rounded-md bg-white p-8'
      onSubmit={handleSubmit}
    >
      <div className='my-4 flex flex-col'>
        <textarea
          name='title'
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='my-2 resize-none rounded-md bg-gray-200 p-4 text-lg text-gray-700 caret-slate-700 outline-none'
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <p
          className={
            (clsx('text-sm font-bold'),
            title.length ? 'text-red-700' : 'text-gray-700')
          }
        >
          {title.length}/300
        </p>
        <button
          disabled={isDisabled}
          className='rounded-xl bg-teal-600 py-2 px-6 text-sm text-white disabled:opacity-25'
          type='submit'
        >
          Create a post
        </button>
      </div>
    </form>
  )
}
