'use client'
import { useGlobalContext } from '@/lib/context/GlobalContext'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'

export function ChatInput() {
  const { data: session, status } = useSession()
  const { socket } = useGlobalContext()
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket?.emit('send-message', { name: session?.user?.name, text: message })
    console.log(message)

    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-between items-center p-2 bg-muted'
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='border rounded p-3 w-full resize-y shadow-md'
        disabled={status !== 'authenticated'}
      />

      <button
        disabled={status !== 'authenticated'}
        type='submit'
        className='border border-border rounded-full p-2 flex justify-center items-center bg-primary'
      >
        <IoSendSharp className='text-white' />
      </button>
    </form>
  )
}
