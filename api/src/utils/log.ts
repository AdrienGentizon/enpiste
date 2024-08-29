export function logOperation(operationName: string) {
  console.log('[Operation]', operationName)
}

export function logError(operationName: string, error: unknown) {
  const errorMessage = `[Error] ${operationName} ${(error as Error)?.message ?? 'unknown error'}`
  console.error(errorMessage)
  return errorMessage
}
