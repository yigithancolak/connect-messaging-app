import { useGlobalContext } from '@/lib/context/GlobalContext'
import { vt323 } from '@/public/fonts/fonts'
import { motion } from 'framer-motion'
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
          <motion.div
            //animations
            initial={{ x: '-300%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            //attributes
            key={index}
            className={`flex flex-col rounded-md ${
              message.email !== session?.user?.email && 'items-end'
            }  p-1 bg-white`}
          >
            <p className={`${vt323.className} text-primary`}>{message.name}</p>
            <p className='whitespace-normal break-words'>{message.text}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
