import { NextResponse } from 'next/server'
import { SafeParseError } from 'zod'

import { logError } from './log'

export function getLoggedErrorResponse(
  operationName: string,
  error: unknown,
  status: number = 500
) {
  return NextResponse.json(
    {
      error: logError(operationName, error),
    },
    {
      status,
    }
  )
}

export function getNotImplementedYetResponse(operationName: string) {
  return getLoggedErrorResponse(
    operationName,
    new Error('not implemented yet'),
    503
  )
}

export function getSafeParseErrorResponse(parsed: SafeParseError<unknown>) {
  const firstError = parsed.error.errors.at(0)

  const errorMessage = firstError
    ? `[${firstError?.path[0]}]: ${firstError?.message}`
    : `unknown error`
  logError('validation', new Error(errorMessage))
  return NextResponse.json({ error: errorMessage }, { status: 400 })
}
