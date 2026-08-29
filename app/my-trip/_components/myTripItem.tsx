import React from 'react'
import { Trip } from '../page'
import Image from 'next/image'
import Link from 'next/link'

type Prop = {
    trip: Trip
}

const MyTripItem = ({ trip }: Prop) => {
    return (
        <Link href={'/view-trip/'+trip.tripId} className="flex flex-col gap-2 border border-gray-200 shadow-md rounded-2xl p-4 transition-all duration-300 hover:shadow-lg bg-white">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
                <Image
                    alt='tripImage'
                    src="/placeholder.jpg"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Destination Title */}
            <p className="font-bold text-lg text-gray-800 mt-2">
                {trip?.tripDetails?.destination || "Unknown Destination"}
            </p>

            {/* Trip Details Subtext */}
            <p className="text-sm text-gray-500 font-medium">
                {trip?.tripDetails?.duration || "0 Days"} trip with {trip?.tripDetails?.budget || "Budget"} budget
            </p>
        </Link>

    );
}

export default MyTripItem
