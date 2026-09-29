'use client'

import React, { useEffect, useState } from 'react'
import { Trip } from '../page'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

type Prop = {
    trip: Trip
}

const MyTripItem = ({ trip }: Prop) => {
    const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;
        const destination = trip?.tripDetails?.destination;
        if (destination) {
            axios.post('/api/googlePhoto', { placeName: destination })
                .then(res => {
                    if (isMounted && res.data?.photoUrl) {
                        setPhotoUrl(res.data.photoUrl);
                    }
                })
                .catch(() => {});
        }
        return () => {
            isMounted = false;
        };
    }, [trip?.tripDetails?.destination]);

    return (
        <Link href={'/view-trip/'+trip.tripId} className="flex flex-col gap-2 border border-gray-200 shadow-md rounded-2xl p-3 md:p-4 transition-all duration-300 hover:shadow-lg bg-white">
            {/* Image Container */}
            <div className="relative h-40 md:h-48 w-full overflow-hidden rounded-xl bg-muted">
                <Image
                    alt={trip?.tripDetails?.destination || 'tripImage'}
                    src={photoUrl || "/placeholder.jpg"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    onError={() => setPhotoUrl("/placeholder.jpg")}
                />
            </div>

            {/* Destination Title */}
            <p className="font-bold text-base md:text-lg text-gray-800 mt-2">
                {trip?.tripDetails?.destination || "Unknown Destination"}
            </p>

            {/* Trip Details Subtext */}
            <p className="text-xs md:text-sm text-gray-500 font-medium">
                {trip?.tripDetails?.duration || "0 Days"} trip with {trip?.tripDetails?.budget || "Budget"} budget
            </p>
        </Link>
    );
}

export default MyTripItem