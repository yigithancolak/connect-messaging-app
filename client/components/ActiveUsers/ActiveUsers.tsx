import { useGlobalContext } from '@/lib/context/GlobalContext'

export function ActiveUsers() {
  const { users } = useGlobalContext()

  return (
    <>
      <div className='border-b p-2'>Online: {users.length}</div>
      <ul className='flex flex-col p-2'>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
