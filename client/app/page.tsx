import { ChatDashboard } from '@/components/ChatDashboard/ChatDashboard'
import { Header } from '@/components/Header/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex justify-center h-[90vh]'>
        <ChatDashboard />
      </main>
    </>
  )
}
