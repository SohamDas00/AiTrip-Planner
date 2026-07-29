import { Button } from '@/components/ui/button'
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
  return (
    <div className='flex justify-between p-5'>

      {/* logo */}
      <div className='flex  gap-2 items-center'>
        <Image src='logo.svg' alt='logo' width={30} height={30} />
        <h2 className='font-bold text-2xl'>Ai Trip Planner</h2>
      </div>

      {/* middle part */}
      <div className='flex gap-5 items-center'>
        {itemList.map((item, index) =>
          <Link key={index} href={item.path}>
            <h2 className='text-lg text-black hover:scale-105 transition-all hover:text-primary'>
              {item.name}
            </h2>
          </Link>
        )}
      </div>

      {/* get started */}
      <Button>Get Started</Button>
    </div>
  )
}

export default Header