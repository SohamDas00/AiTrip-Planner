import { Wallet, Clock, MapPinned, SlidersHorizontal } from 'lucide-react'

const features = [
    {
        icon: <Wallet className='h-6 w-6 text-primary' />,
        title: 'Budget-aware picks',
        description: 'Hotels and itineraries are shaped around the budget you set — no surprises later.',
    },
    {
        icon: <Clock className='h-6 w-6 text-primary' />,
        title: 'Plans in seconds',
        description: 'Skip hours of research across sites. Your day-by-day itinerary is ready almost instantly.',
    },
    {
        icon: <MapPinned className='h-6 w-6 text-primary' />,
        title: 'Built around your destination',
        description: 'Every recommendation is specific to where you are going, not a generic template.',
    },
    {
        icon: <SlidersHorizontal className='h-6 w-6 text-primary' />,
        title: 'Access anytime',
        description: 'Your trips are saved to your account — come back whenever you like to view them again.',
    },
]

export function Features() {
    return (
        <div className='w-full py-16'>
            <div className='max-w-5xl mx-auto px-4'>
                <h2 className='text-xl md:text-3xl font-bold text-center mb-12'>Why plan with us</h2>
                <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
                    {features.map((feature) => (
                        <div key={feature.title} className='border rounded-2xl p-6 flex flex-col items-center text-center gap-3'>
                            <div className='h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                                {feature.icon}
                            </div>
                            <h3 className='font-semibold'>{feature.title}</h3>
                            <p className='text-sm text-gray-500'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}