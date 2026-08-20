import { Button } from '@/components/ui/button'
import { SignIn, SignInButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <div className='flex justify-between p-5'>
      {/* logo */}
      <Link href={'/'}>
        <div className='flex  gap-2 items-center'>
          <Image src='logo.svg' alt='logo' width={30} height={30} />
          <h2 className='font-bold text-2xl'>Ai Trip Planner</h2>
        </div>
      </Link>

      {/* middle part */}
      <div className='flex gap-7 items-center'>
        {itemList.map((item, index) =>
          <Link key={index} href={item.path}>
            <h2 className='text-lg text-black hover:scale-105 transition-all hover:text-primary'>
              {item.name}
            </h2>
          </Link>
        )}
      </div>

      {!user ? (
        <SignInButton mode='modal'>
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <Link href='/create-new-trip'><Button>Create new Trip</Button></Link>
      )}
    </div>
  )
}

export default Header