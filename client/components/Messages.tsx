'use client'
import { useGlobalContext } from '@/lib/context/GlobalContext'
import { FormEvent, useState } from 'react'

export default function Messages() {
  const { socket, allMessages, users } = useGlobalContext()

  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket?.emit('send-message', text)
    setText('')
  }

  return (
    <div className='grid grid-cols-2'>
      <aside>
        <div>Connected Users</div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </aside>

      <div className='border'>
        {/*  MESSAGES */}
        <div className='min-h-[50vh]'>
          {allMessages &&
            allMessages?.map((singleMessage, index) => {
              return <p key={index}>{singleMessage}</p>
            })}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='border'
          />
          <button type='submit' className='border border-black rounded'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
