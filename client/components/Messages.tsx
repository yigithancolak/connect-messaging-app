'use client'
import { useGlobalContext } from '@/lib/context/GlobalContext'
import { Session } from 'next-auth'
import { FormEvent, useState } from 'react'

interface MessagesProps {
  session: Session | null
}

export type MessageDetails = {
  name: string
  text: string
}

export default function Messages(props: MessagesProps) {
  const { session } = props
  const { socket, allMessages, users } = useGlobalContext()
  const [messageDetails, setMessageDetails] = useState<MessageDetails>({
    name: session?.user?.name!,
    text: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket?.emit('send-message', messageDetails)
    setMessageDetails({ name: session?.user?.name!, text: '' })
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
            allMessages?.map((message, index) => {
              return (
                <div key={index} className='py-1'>
                  <p>{message.name}</p>
                  <p>{message.text}</p>
                </div>
              )
            })}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={messageDetails.text}
            onChange={(e) =>
              setMessageDetails({ ...messageDetails, text: e.target.value })
            }
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
