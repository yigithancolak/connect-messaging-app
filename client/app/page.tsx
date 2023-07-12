'use client'

import Messages from '@/components/Messages'
import Nav from '@/components/Nav/Nav'

export default function Home() {
  return (
    <>
      <Nav />

      <main className='flex min-h-screen flex-col items-center justify-between'>
        <Messages />
      </main>
    </>
  )
}
