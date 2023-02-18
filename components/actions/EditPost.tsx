import Image from 'next/image'

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
  comments,
  id
}: EditProps) {
  return (
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

        <button className='text-sm font-bold text-red-500'>Delete</button>
      </div>
    </div>
  )
}
