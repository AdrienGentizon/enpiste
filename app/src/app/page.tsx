import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h2>Home</h2>
      <Link href={`/profile/create`}>Create a profile</Link>
    </main>
  )
}
