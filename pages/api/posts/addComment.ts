import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import prisma from '@prisma'

import { authOptions } from '@api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Please sign in to make a post' })
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user?.email as string | undefined }
  })

  if (req.method === 'POST') {
    try {
      const { title, postId } = req.body.data

      if (!title.length) {
        return res.status(401).json({ message: 'Please enter something' })
      }

      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId
        } as any
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: 'Error has occured while making a post' })
    }
  }
}
