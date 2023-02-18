import { PostType } from '@types'

import Post from './Post'

export default function Posts({ data }: { data: PostType[] | undefined }) {
  return (
    <>
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          comments={post.Comment}
        />
      ))}
    </>
  )
}
