import { useGlobalContext } from '@/lib/context/GlobalContext'
import { vt323 } from '@/public/fonts/fonts'
import { Skeleton } from '../ui/skeleton'

export function ActiveUsers() {
  const { users, session } = useGlobalContext()

  const loadingSkeletons = Array(4).fill({})

  return (
    <>
      <div className={`border-b-2 p-2 text-[20px] ${vt323.className}`}>
        Online: <span className='text-green-300 font-bold'>{users.length}</span>
      </div>
      <ul className='flex flex-col p-2 space-y-2'>
        {session
          ? users.map((user, index) => (
              <li
                key={index}
                className='border border-primary p-1 text-sm rounded text-primary'
              >
                {user.name}
              </li>
            ))
          : loadingSkeletons.map((_, index) => (
              <Skeleton key={index} className='h-6 w-full' />
            ))}
      </ul>
    </>
  )
}
