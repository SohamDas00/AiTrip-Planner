import Link from 'next/link'

export function Footer() {
    return (
        <footer className='w-full border-t mt-10'>
            <div className='max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-6'>
                <div>
                    <h3 className='font-bold text-lg'>Trip<span className='text-primary'>Genie</span></h3>
                    <p className='text-sm text-gray-500 mt-1 max-w-xs'>Your personal AI trip planner — hotels and itineraries in seconds.</p>
                </div>
                <div className='flex gap-10 text-sm'>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold'>Product</span>
                        <Link href='/create-new-trip' className='text-gray-500 hover:text-primary'>Create a trip</Link>
                        <Link href='/pricing' className='text-gray-500 hover:text-primary'>Pricing</Link>
                        <Link href='/my-trip' className='text-gray-500 hover:text-primary'>my-trip</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold'>Company</span>
                        <Link href='/contact' className='text-gray-500 hover:text-primary'>Contact</Link>
                    </div>
                </div>
            </div>
            <div className='text-center text-xs text-gray-400 py-4 border-t'>
                © {new Date().getFullYear()} TripGenie. All rights reserved.
            </div>
        </footer>
    )
}