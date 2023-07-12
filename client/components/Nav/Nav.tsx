'use client'

import { signOut } from 'next-auth/react'

export default function Nav() {
  return (
    <header className='flex justify-between'>
      <div>
        <span>logo</span>
      </div>

      <div>
        <button onClick={() => signOut()} className='border p-3'>
          Sign Out
        </button>
      </div>
    </header>
  )
}
