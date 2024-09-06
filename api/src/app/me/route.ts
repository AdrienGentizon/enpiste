import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getVerifiedClerkUser } from '@/utils/auth'
import getDB from '@/utils/db'
import { logOperation } from '@/utils/log'
import {
  getLoggedErrorResponse,
  getSafeParseErrorResponse,
} from '@/utils/response'

export async function GET() {
  const operationName = `GET/me`
  try {
    logOperation(operationName)

    const { clerkId } = await getVerifiedClerkUser(headers())
    const { rows } = await getDB().query<{
      id: string
      email: string
      name: string
    }>({
      text: `SELECT id::text, email::text, name::text FROM public.user WHERE clerk_id=$1 AND onboarding_at IS NOT NULL;`,
      values: [clerkId],
    })
    if (rows.length === 0) throw new Error('cannot select user')

    return NextResponse.json<{ id: string; email: string; name: string }>(
      rows[0],
      { status: 200 }
    )
  } catch (error) {
    return getLoggedErrorResponse(operationName, error)
  }
}

export async function PATCH(req: NextRequest) {
  const operationName = `PATCH/me`
  try {
    logOperation(operationName)

    const { clerkId } = await getVerifiedClerkUser(headers())

    const parsed = z
      .object({ name: z.string().min(3).max(64) })
      .safeParse(await req.json())
    if (!parsed.success) return getSafeParseErrorResponse(parsed)

    const { rows } = await getDB().query<{
      id: string
      name: string
      email: string
      onboardingAt: number
    }>({
      text: `
      UPDATE
        public.user
      SET
        name = $2,
        onboarding_at = COALESCE(onboarding_at, NOW())
      WHERE
        clerk_id = $1
      RETURNING
        id::text,
        name::text,
        email::text,
        FLOOR(DATE_PART('epoch', onboarding_at) * 1000) as "onboardingAt";`,
      values: [clerkId, parsed.data.name],
    })
    if (rows.length === 0) throw new Error('cannot patch user')
    return NextResponse.json<{
      id: string
      name: string
      email: string
      onboardingAt: number
    }>(rows[0], { status: 200 })
  } catch (error) {
    return getLoggedErrorResponse(operationName, error)
  }
}
