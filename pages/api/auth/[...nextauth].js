import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import prisma from '@prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
    })
  ]
}

export default NextAuth(authOptions)
