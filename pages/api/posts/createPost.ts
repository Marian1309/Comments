import prisma from '@prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).json({ message: 'Please sign in to make a post' })
    }

    const title: string = req.body.title

    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email as string }
    })

    if (title.length > 300) {
      return res.status(403).json({ message: 'Please write a shorter message' })
    }

    if (!title.length) {
      return res.status(403).json({ message: 'Please do not leave this empty' })
    }

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id as string
        }
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: 'Error has occured while making a post' })
    }
  }
}
