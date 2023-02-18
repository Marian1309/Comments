import Image from 'next/image'
import Link from 'next/link'

interface PostProps {
  avatar: string
  name: string
  postTitle: string
  id: string
  comments: any[] | undefined
}

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments
}: PostProps) {
  return (
    <div className='my-8 mx-auto max-w-[1000px] rounded-lg bg-white p-8 text-black'>
      <div className='flex items-center gap-2'>
        <Image
          className='rounded-full'
          width={32}
          height={32}
          src={avatar}
          alt='avatar'
        />

        <h3 className='font-bold text-gray-700'>{name}</h3>
      </div>

      <div className='my-8'>
        <p className='break-all'>{postTitle}</p>
      </div>

      <div className='flex cursor-pointer items-center gap-8'>
        <Link href={`/post/${id}`}>
          <p className='text-sm font-bold text-gray-700'>
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  )
}
