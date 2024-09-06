'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { createUser } from '@/actions/onboarding/createUser'
import Button from '@/components/Button/Button'
import Fieldset from '@/components/Fieldset/Fieldset'
import Form from '@/components/Form/Form'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'

export default function OnboardingPage() {
  const { data, error: meError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/me`)
      if (!response.ok) throw new Error('cannot fetch me')
      return (await response.json()) as unknown as {
        id: string
        email: string
        name: string
      }
    },
  })
  console.log(data)
  if (meError) console.error(meError.message)
  const [error, setError] = useState<Error | undefined>(undefined)
  return (
    <main>
      <h2>Onboarding</h2>
      <Form
        action={async (formData) => {
          const { error } = await createUser(formData)
          setError(new Error(error))
        }}
      >
        <Fieldset>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" minLength={3} required />
          {error && <p className="text-red-500">{error.message}</p>}
        </Fieldset>
        <Button type="submit">Submit</Button>
      </Form>
    </main>
  )
}
