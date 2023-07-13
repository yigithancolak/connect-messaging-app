'use client'
import { ActiveUsers } from '../ActiveUsers/ActiveUsers'
import { ChatInput } from '../ChatInput/ChatInput'
import { Messages } from '../Messages/Messages'

export function ChatDashboard() {
  return (
    <div className='grid grid-cols-3 h-fit mt-4 w-[80%] shadow-custom'>
      {/* ONLINE USERS */}
      <aside className='col-span-1 overflow-y-auto'>
        <ActiveUsers />
      </aside>

      {/*  MESSAGES SECTION */}
      <div className='col-span-2'>
        <Messages />
        <ChatInput />
      </div>
    </div>
  )
}
