'use client'
import { Button } from '@/components/ui/button'
import { SignIn, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

const Header = () => {

  const itemList = [
    {
      name: 'home',
      path: '/'
    },
    {
      name: 'Pricing',
      path: '/pricing'
    },
    {
      name: 'contact',
      path: '/contact'
    }
  ]

  const { user } = useUser();
  const pathName = usePathname();
  const myTrip = pathName === '/create-new-trip'

  return (
    <div className='flex justify-between items-center p-3 sm:p-5 gap-2'>
      {/* logo */}
      <Link href={'/'}>
        <div className='flex gap-1 sm:gap-2 items-center'>
          <Image src='logo.svg' alt='logo' width={24} height={24} className='sm:w-[30px] sm:h-[30px]' />
          <h2 className='font-bold text-lg sm:text-2xl'>TripGenie</h2>
        </div>
      </Link>

      {/* middle part */}
      <div className='flex gap-3 sm:gap-7 items-center'>
        {itemList.map((item, index) =>
          <Link key={index} href={item.path}>
            <h2 className='text-sm sm:text-lg text-black hover:scale-105 transition-all hover:text-primary'>
              {item.name}
            </h2>
          </Link>
        )}
      </div>

      <div className='flex gap-2'>
        {!user ? (
          <SignInButton mode='modal'>
            <Button size='sm' className='sm:h-10 sm:px-4 sm:text-base text-xs px-2 h-8'>
              Get Started
            </Button>
          </SignInButton>
        ) :
          myTrip ? (
            <Link href='/my-trip'>
              <Button size='sm' className='sm:h-10 sm:px-4 sm:text-base text-xs px-2 h-8'>
                My Trips
              </Button>
            </Link>
          ) : (
            <Link href='/create-new-trip'>
              <Button size='sm' className='sm:h-10 sm:px-4 sm:text-base text-xs px-2 h-8'>
                Create new Trip
              </Button>
            </Link>
          )
        }
        <UserButton />
      </div>
    </div>
  )
}

export default Header