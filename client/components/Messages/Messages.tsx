import { useGlobalContext } from '@/lib/context/GlobalContext'
import { vt323 } from '@/public/fonts/fonts'
import { useEffect, useRef } from 'react'

export function Messages() {
  const { allMessages, session } = useGlobalContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [allMessages])

  return (
    <div
      ref={messagesEndRef}
      className='h-[60vh] overflow-y-auto overflow-x-hidden bg-muted flex flex-col space-y-2 p-2'
    >
      {allMessages?.map((message, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col rounded-md ${
              message.name !== session?.user?.name && 'items-end'
            }  p-1 bg-white`}
          >
            <p className={`${vt323.className} text-primary`}>{message.name}</p>
            <p>{message.text}</p>
          </div>
        )
      })}
    </div>
  )
}
