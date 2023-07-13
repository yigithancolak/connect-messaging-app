import { ChatDashboard } from '@/components/ChatDashboard/ChatDashboard'
import { Header } from '@/components/Header/Header'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Header />

      <main className='flex justify-center h-[90vh]'>
        <ChatDashboard />
      </main>
    </>
  )
}
