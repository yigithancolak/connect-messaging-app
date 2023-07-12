'use client'

import { socket } from '@/lib/socket/socket'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

// type StateType = {
//   count: number;
// };

// type ActionType = {
//   type: string;
// };

// const initialState: StateType = {
//   count: 0,
// };

// const reducer = (state: StateType, action: ActionType) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return { ...state, count: state.count + 1 };
//     case "DECREMENT":
//       return { ...state, count: state.count - 1 };
//     case "RESET":
//       return { ...state, count: 0 };
//     default:
//       return state;
//   }
// };

const GlobalContext = createContext<{
  users: UserType[]
  allMessages: string[]
  socket: Socket | null
}>({
  users: [],
  allMessages: [],
  socket: null
})

type UserType = {
  email: string
  name: string
  socketId: string
}

export const GlobalContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [users, setUsers] = useState<UserType[]>([])
  const [allMessages, setAllMessages] = useState<string[]>([])
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return
    socket.emit('entered-app', session?.user)
    socket.on('online-users', (users: UserType[]) => {
      setUsers(users)
    })

    return () => {
      socket.disconnect()
    }
  }, [status])

  //   function socketInitializer() {
  //     socket.on('recieve-message', (message) => {
  //       setAllMessages((pre) => [...pre, message])
  //     })

  //     socket.on('online', (onlineUsers: UserType[]) => {
  //       setUsers(onlineUsers)
  //     })
  //   }

  console.log(users)

  return (
    <GlobalContext.Provider value={{ socket, allMessages, users }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
