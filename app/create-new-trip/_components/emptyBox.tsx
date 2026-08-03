import { suggestion } from "@/app/_component/hero"

const EmptyBox = ({ onSelectOption }: any) => {
    return (
        <div>
            <h1 className="font-bold text-3xl text-center">Start Planning new <strong className="text-primary">Trip</strong> using AI</h1>
            <p className="text-gray-400 text-center mt-5">Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly with the power of AI. Let our smart assistant do the hard work while you enjoy the journey</p>
            <div className="flex flex-col gap-3 mt-5">
                {suggestion.map((trip, index) =>
                    <div key={index} onClick={() => onSelectOption(trip.title)} className='flex gap-2 items-center border p-4 rounded-2xl cursor-pointer hover:border-primary'>
                        {trip.icon}
                        <h1 className='text-sm text-black hover:scale-105 transition-all hover:text-primary'>{trip.title}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmptyBox
