import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import prisma from '@prisma'

import { authOptions } from '@api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).json({ message: 'Please sign in to make a post' })
    }

    try {
      const { postId } = req.body
      console.log(postId)

      const result = await prisma.post.delete({
        where: {
          id: postId
        }
      })

      return res.status(200).json(result)
    } catch (err) {
      return res
        .status(403)
        .json({ err: 'Error has occured while making a post' })
    }
  }
}
