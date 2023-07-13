import { useGlobalContext } from '@/lib/context/GlobalContext'
import { useEffect, useRef } from 'react'

export function Messages() {
  const { allMessages } = useGlobalContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [allMessages])

  return (
    <div ref={messagesEndRef} className='h-[60vh] overflow-y-auto bg-muted'>
      {allMessages?.map((message, index) => {
        return (
          <div key={index} className='py-1'>
            <p>{message.name}</p>
            <p>{message.text}</p>
          </div>
        )
      })}
    </div>
  )
}
