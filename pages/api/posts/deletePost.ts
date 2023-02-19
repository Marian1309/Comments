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
    try {
      const postId = req.body

      const result = await prisma.post.delete({
        where: {
          id: postId
        }
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ message: 'Error has occured while making a post' })
    }
  }
}
