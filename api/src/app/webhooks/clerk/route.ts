import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { QueryConfig } from 'pg'

import { getVerifiedClerkWebhookPayload } from '@/utils/clerk'
import getDB from '@/utils/db'
import { logError } from '@/utils/log'
import { getNotImplementedYetResponse } from '@/utils/response'

export async function POST(req: NextRequest) {
  const operationName = 'POST/webhooks/clerk'
  try {
    const verifiedPayload = await getVerifiedClerkWebhookPayload(headers(), req)

    if (verifiedPayload.type !== 'user.created')
      return getNotImplementedYetResponse(operationName)

    const email = verifiedPayload.data.email_addresses.at(0)?.email_address
    if (!email)
      return NextResponse.json({ error: `email is required` }, { status: 400 })

    const query: QueryConfig = {
      text: `
  INSERT INTO public.user(clerk_id, email)
		VALUES($1, $2)
	RETURNING
		id::text, clerk_id::text AS "clerkId", email::text`,
      values: [verifiedPayload.data.id, email],
    }
    const { rows } = await getDB().query<{
      id: string
      clerkId: string
      email: string
    }>(query)
    if (rows.length === 0) throw new Error('cannot insert user')

    return NextResponse.json(
      { operation: 'user.created', status: 200 },
      { status: 200 }
    )
  } catch (error) {
    logError(operationName, error)
    return NextResponse.json({ error: 'cannot insert user' }, { status: 500 })
  }
}
