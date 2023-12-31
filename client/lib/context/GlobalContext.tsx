'use client'

import { socket } from '@/lib/socket/socket'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

const GlobalContext = createContext<{
  users: UserType[]
  allMessages: MessageDetails[]
  socket: Socket | null
  session: Session | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
}>({
  users: [],
  allMessages: [],
  socket: null,
  session: null,
  status: 'loading'
})

type UserType = {
  email: string
  name: string
  socketId: string
}
type MessageDetails = {
  name: string
  text: string
  email: string
}

export const GlobalContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState<UserType[]>([])
  const [allMessages, setAllMessages] = useState<MessageDetails[]>([])
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return
    socket.emit('entered-app', session?.user)
    socket.on('online-users', (users: UserType[]) => {
      setUsers(users)
    })
    socket.on('recieve-message', (messageDetails: MessageDetails) =>
      setAllMessages((prev) => [...prev, messageDetails])
    )

    return () => {
      socket.off('online-users')
      socket.off('entered-app')
      socket.disconnect()
    }
  }, [status])

  return (
    <GlobalContext.Provider
      value={{ socket, allMessages, users, session, status }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
