export function logOperation(operationName: string) {
  console.log('[Operation]', operationName)
}

export function logError(operationName: string, error: unknown) {
  console.error(
    '[Error]',
    operationName,
    (error as Error)?.message ?? 'unknown error'
  )
}
