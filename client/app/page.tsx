import Messages from '@/components/Messages'
import Nav from '@/components/Nav/Nav'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Nav />

      <main className='flex min-h-screen flex-col items-center justify-between'>
        <Messages session={session} />
      </main>
    </>
  )
}
