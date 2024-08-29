import { NextResponse } from 'next/server'

import getDB from '@/utils/db'
import { logOperation } from '@/utils/log'
import { getLoggedErrorResponse } from '@/utils/response'

export async function GET() {
  const operationName = 'GET/health/db'
  try {
    logOperation(operationName)
    const { rows } = await getDB().query<{ connected: boolean }>(
      `SELECT 1::boolean as "connected";`
    )
    if (rows.length === 0) throw new Error('unable to get db connection')
    return NextResponse.json({ status: 'up' }, { status: 200 })
  } catch (error) {
    return getLoggedErrorResponse(operationName, error)
  }
}
