export interface PostType {
  createdAt: string
  id: string
  published: boolean
  title: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    image: string
  }
  Comment?: {
    createAt: string
    id: string
    postId: string
    userId: string
  }[]
}
