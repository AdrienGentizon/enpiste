import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import Button from '../Button/Button'

export default function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton>
          <Button>Sign in with Clerk</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
