import { SlidersHorizontal, Sparkles, MapPinned } from 'lucide-react'

const steps = [
    {
        icon: <SlidersHorizontal className='h-6 w-6 text-primary' />,
        title: 'Set your trip details',
        description: 'Pick your destination, budget, number of travelers, trip length, and any special requirements.',
    },
    {
        icon: <Sparkles className='h-6 w-6 text-primary' />,
        title: 'AI builds your plan',
        description: 'We generate a hotel pick and a day-by-day itinerary tailored to what you selected.',
    },
    {
        icon: <MapPinned className='h-6 w-6 text-primary' />,
        title: 'Review & go',
        description: 'Fine-tune anything you like, then head off with your full itinerary in hand.',
    },
]

export function HowItWorks() {
    return (
        <div className='w-full py-16'>
            <div className='max-w-5xl mx-auto px-4'>
                <h2 className='text-xl md:text-3xl font-bold text-center mb-12'>See how it works...</h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    {steps.map((step, index) => (
                        <div key={step.title} className='relative border rounded-2xl p-6 text-center flex flex-col items-center gap-3'>
                            <span className='absolute -top-3 -left-3 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold'>
                                {index + 1}
                            </span>
                            <div className='h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                                {step.icon}
                            </div>
                            <h3 className='font-semibold text-lg'>{step.title}</h3>
                            <p className='text-sm text-gray-500'>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}