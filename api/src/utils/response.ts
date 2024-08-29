import { NextResponse } from 'next/server'

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
