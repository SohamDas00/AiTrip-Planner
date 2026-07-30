'use client'

import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Hero = () => {

    const suggestion = [
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

    const {user}=useUser();
    const route=useRouter();
    const onSend=()=>{
        if(!user){
            route.push('/sign-in');
            return;
        }
        //go to trip planner page
    }

    return (
        <div className='mt-24 w-full flex justify-center'>
            {/* content */}
            <div className='max-w-3xl w-full text-center space-y-6'>
                <h1 className='text-xl md:text-5xl font-bold'>Hey, I'm your personal<span className='text-primary'> trip planner</span></h1>
                <p className='text-gray-500 text-lg'>Tell me what you want, and I'll handle the rest: flight,hotel, itineraries - all in seconds </p>

                {/* search */}
                <div>
                    <div className='border h-28 shadow rounded-3xl p-2 relative'>
                        <Textarea
                            placeholder="Create a trip to Paris from New York"
                            className='w-full bg-transparent border-none resize-none focus-visible:ring-0 shadow-none ' />
                        <Button size={'icon'} className='absolute bottom-4 right-4' onClick={()=>onSend()}>
                            <Send />
                        </Button>
                    </div>
                </div>
                {/* suggestion */}
                <div className='flex justify-around'>
                    {suggestion.map((trip, index) =>
                        <div key={index} className='flex gap-2 items-center border p-2 rounded-2xl cursor-pointer'>
                            {trip.icon}
                            <h1 className='text-sm text-black hover:scale-105 transition-all hover:text-primary'>{trip.title}</h1>
                        </div>
                    )}
                </div>
                <h2 className='my-7 mt-14 gap-2'>Not sure where to start? <strong>See how its works..</strong></h2>
                {/* video */}
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="from-center"
                    videoSrc="https://www.example.com/dummy-video"
                    thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                    thumbnailAlt="Dummy Video Thumbnail"
                />

            </div>
        </div>
    )
}

export default Hero
