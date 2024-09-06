import { verifyToken } from '@clerk/nextjs/server'

import getEnv from './env'

export async function getVerifiedClerkUser(headers: Headers) {
  const authorization = headers.get('Authorization')
  if (!authorization) throw new Error('unauthorized')

  const token = authorization.split('bearer ').at(1)
  if (!token) throw new Error('unauthorized')

  const { sub } = await verifyToken(token, {
    secretKey: getEnv().CLERK_SECRET_KEY,
  })

  return {
    clerkId: sub,
  }
}
