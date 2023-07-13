'use client'

import { moirai } from '@/public/fonts/fonts'
import UserMenu from '../UserMenu/UserMenu'

export function Header() {
  return (
    <header className='flex justify-between h-[10vh] px-3 bg-primary'>
      {/* LOGO */}
      <div className='flex items-center'>
        <h1 className={`${moirai.className} text-[30px] text-white`}>
          CONNECT
        </h1>
      </div>

      {/* MENU */}
      <div className='flex'>
        <UserMenu />
      </div>
    </header>
  )
}
