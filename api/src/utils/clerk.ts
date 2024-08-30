import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { Webhook } from 'svix'

import getEnv from './env'

export async function getVerifiedClerkWebhookPayload(
  headerPayload: Headers,
  req: NextRequest
) {
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new Error(`no svix headers`)
  }
  const payload = await req.json()

  const webhook = new Webhook(getEnv().CLERK_WEBHOOK_SECRET)

  return webhook.verify(JSON.stringify(payload), {
    'svix-id': svixId,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature,
  }) as WebhookEvent
}
