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

  if (req.method === 'DELETE') {
    const userId = req.body
    console.log(userId)

    try {
      const data = await prisma.comment.deleteMany({
        where: {
          postId: userId
        }
      })

      return res.status(200).json(data)
    } catch (err) {
      return res
        .status(403)
        .json({ err: 'Error has occured while deleting a comment' })
    }
  }
}
