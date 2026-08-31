import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Compass } from 'lucide-react'

export default function NotFound() {
    return (
        <div className='min-h-[70vh] w-full flex items-center justify-center px-4'>
            <div className='max-w-md w-full text-center space-y-6'>
                <div className='h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto'>
                    <Compass className='h-8 w-8 text-primary' />
                </div>
                <div className='space-y-2'>
                    <h1 className='text-3xl md:text-5xl font-bold'>404</h1>
                    <h2 className='text-lg font-semibold'>This page took a wrong turn</h2>
                    <p className='text-sm text-gray-500'>
                        We couldn't find the page you're looking for. It might have been moved, or the address might be off.
                    </p>
                </div>
                <Link href='/'>
                    <Button className='gap-2'>Back to home</Button>
                </Link>
            </div>
        </div>
    )
}