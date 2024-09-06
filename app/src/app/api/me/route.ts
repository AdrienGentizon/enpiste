import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const operationName = `GET/api/me`
  try {
    console.log(operationName)
    const { getToken } = auth()
    const token = await getToken()
    if (!token)
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    const response = await fetch(`http://localhost:3001/me`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error(`api error ${response.status}`)
    return NextResponse.json(await response.json(), { status: 200 })
  } catch (error) {
    console.error(operationName, (error as Error)?.message ?? 'unknown reason')
    return NextResponse.json(
      { error: (error as Error)?.message ?? 'unknown reason' },
      { status: 500 }
    )
  }
}
