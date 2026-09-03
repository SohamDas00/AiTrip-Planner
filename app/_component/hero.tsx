'use client'

import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const suggestion = [
    {
        title: 'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: 'Inspite me where to go',
        icon: <Plane className='text-orange-400 h-5 w-5' />
    },
    {
        title: 'Discove Hidden gems',
        icon: <Landmark className='text-pink-500 h-5 w-5' />
    },
    {
        title: 'Adventure Destination',
        icon: <Globe2 className='text-green-400 h-5 w-5' />
    },
]

const Hero = () => {

    const { user } = useUser();
    const route = useRouter();
    const onSend = () => {
        if (!user) {
            route.push('/sign-in');
            return;
        }
        //go to trip planner page
        route.push('/create-new-trip')
    }

    return (
        <div className='mt-12 md:mt-24 w-full flex justify-center px-4'>
            {/* content */}
            <div className='max-w-3xl w-full text-center space-y-4 md:space-y-6'>
                <h1 className='text-2xl md:text-5xl font-bold'>Hey, I'm your personal<span className='text-primary'> trip planner</span></h1>
                <p className='text-gray-500 text-sm md:text-lg'>Tell me what you want, and I'll handle the rest: flight, hotel, itineraries - all in seconds </p>

                {/* search */}
                <div>
                    <div className='border h-24 md:h-28 shadow rounded-3xl p-2 relative'>
                        <Textarea
                            placeholder="Create a trip to Paris from New York"
                            className='w-full bg-transparent border-none resize-none focus-visible:ring-0 shadow-none text-sm md:text-base' />
                        <Button size={'icon'} className='absolute bottom-3 right-3 md:bottom-4 md:right-4 h-8 w-8 md:h-10 md:w-10' onClick={() => onSend()}>
                            <Send className='h-4 w-4 md:h-5 md:w-5' />
                        </Button>
                    </div>
                </div>
                {/* suggestion */}
                <div className='flex flex-wrap justify-center gap-2 md:justify-around md:gap-0'>
                    {suggestion.map((trip, index) =>
                        <div key={index} className='flex gap-2 items-center border p-2 rounded-2xl cursor-pointer'>
                            {trip.icon}
                            <h1 className='text-xs md:text-sm text-black hover:scale-105 transition-all hover:text-primary'>{trip.title}</h1>
                        </div>
                    )}
                </div>
                {/* <h2 className='my-7 mt-14 gap-2'>Not sure where to start? <strong>See how its works..</strong></h2> */}
                {/* video */}
                {/* <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="from-center"
                    videoSrc="https://www.example.com/dummy-video"
                    thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                    thumbnailAlt="Dummy Video Thumbnail"
                /> */}

            </div>
        </div>
    )
}

export default Hero