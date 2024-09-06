'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function createUser(formData: FormData) {
  const { getToken } = auth()
  const token = await getToken()
  if (!token) throw new Error(`Unauthorized`)
  const name = formData.get('name')
  if (!name) throw new Error(`name is required`)
  const response = await fetch(`http://localhost:3001/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      name,
    }),
  })
  if (!response.ok)
    return {
      error: ((await response.json()) as { error: string }).error,
    }

  redirect('/')
}
