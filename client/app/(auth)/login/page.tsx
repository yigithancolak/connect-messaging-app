'use client'

import { useGlobalContext } from '@/lib/context/GlobalContext'
import { ClientRoutes } from '@/lib/utils/routes'
import { vt323 } from '@/public/fonts/fonts'
import { motion } from 'framer-motion'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'

enum TestUsers {
  Test1 = 'test@test.com',
  Test2 = 'test2@test2.com'
}

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { status } = useGlobalContext()
  const router = useRouter()

  const handleTestSignIn = async (email: TestUsers) => {
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password: 'test',
        redirect: true,
        callbackUrl: ClientRoutes.Home
      })
      if (res?.ok) {
        router.replace(ClientRoutes.Home)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!userInfo.email || !userInfo.password) return

    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: userInfo.email,
        password: userInfo.password,
        redirect: true,
        callbackUrl: ClientRoutes.Home
      })

      if (res?.error) {
        console.log(res.error)
        setLoading(false)
      }

      if (res?.ok) {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center h-[60vh] w-full'>
        <p className='text-center'>Loading...</p>
      </div>
    )
  }

  if (status === 'authenticated') {
    return (
      <div className='flex justify-center items-center h-[60vh] w-full'>
        <p className='text-center'>
          You must signout before you login.{' '}
          <button onClick={() => signOut()} className='underline text-primary'>
            Click For Sign Out
          </button>
        </p>
      </div>
    )
  }

  return (
    <motion.section
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      //   variants={containerVariant}
      //   initial='hidden'
      //   animate='visible'
      //animation

      className='flex flex-col justify-center items-center h-[60vh] w-full'
    >
      <h2 className={`text-center mb-2 ${vt323.className} text-[30px]`}>
        Sign In
      </h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-2/3 md:w-1/3 gap-2'
      >
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type='email'
          placeholder='email@gmail.com'
          className='input-primary'
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type='password'
          placeholder='********'
          className='input-primary'
        />

        <button disabled={loading} type='submit' className='btn-primary'>
          {!loading ? 'Sign In' : 'Loading...'}
        </button>
        <button
          disabled={loading}
          type='button'
          className='btn-primary'
          onClick={() => handleTestSignIn(TestUsers.Test1)}
        >
          Test User 1
        </button>
        <button
          disabled={loading}
          type='button'
          className='btn-primary'
          onClick={() => handleTestSignIn(TestUsers.Test2)}
        >
          Test User 2
        </button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='text-sm'
        >
          Not have an account ?{' '}
          <Link className='underline text-primary' href={ClientRoutes.Register}>
            Sign Up
          </Link>
        </motion.p>
      </form>
    </motion.section>
  )
}
