import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details as string
        },
        include: {
          user: true,
          Comment: {
            orderBy: {
              createAt: 'desc'
            },
            include: {
              user: true
            }
          }
        }
      })

      return res.status(200).json(data)
    } catch (err) {
      return res
        .status(403)
        .json({ err: 'Error has occured while making a post' })
    }
  }
}
