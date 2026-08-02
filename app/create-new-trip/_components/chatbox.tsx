'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React from 'react'

const Chatbox = () => {

    const onSend = () => {

    }

    return (
        <div className='h-[75vh] flex flex-col'>
            {/* display message */}
            <section className='flex-1 overflow-y-auto p-4'>
                <div className='flex justify-end mt-2'>
                    <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                        user response
                    </div>
                </div>
                <div className='flex justify-start mt-2'>
                    <div className='max-w-lg bg-gray-300 text-black px-4 py-2 rounded-lg'>
                        ai response
                    </div>
                </div>
            </section>
            <section className=''>
                <div className='border h-28 shadow rounded-3xl p-2 relative'>
                    <Textarea
                        placeholder="Create a trip to Paris from New York"
                        className='w-full bg-transparent border-none resize-none focus-visible:ring-0 shadow-none ' />
                    <Button size={'icon'} className='absolute bottom-4 right-4' onClick={() => onSend()}>
                        <Send />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox
