import { signOut, useSession } from 'next-auth/react'
import { BiUserCircle } from 'react-icons/bi'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'

export default function UserMenu() {
  const { data: session } = useSession()
  return (
    <Sheet>
      <SheetTrigger className='hover:bg-muted hover:text-primary text-white rounded'>
        <BiUserCircle fontSize={40} />
      </SheetTrigger>
      <SheetContent className='w-[70vw] md:w-[30vw] '>
        <SheetHeader>
          <SheetTitle>
            Name: {session?.user?.name} <br />
            Email: {session?.user?.email}
          </SheetTitle>
        </SheetHeader>

        <button onClick={() => signOut()} className='border p-3 rounded'>
          Sign Out
        </button>
      </SheetContent>
    </Sheet>
  )
}
