'use client'

import React, { useEffect, useState } from 'react'
import { Hotel } from './chatbox'
import Image from 'next/image'
import { Star, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'

type Props = {
    hotel: Hotel,
}

// const photoCache = new Map<string, string | null>();

const HotelCard = ({ hotel }: Props) => {

    const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        hotel && GooglePhoto();
    }, [hotel])

    const GooglePhoto = async () => {
    try {
        const result = await axios.post("/api/googlePhoto", {
            placeName: `${hotel.hotel_name}, ${hotel.hotel_address}`,
        });

        console.log("API RESULT:", result.data);

        const url = result?.data?.photoUrl;

        if (typeof url === "string" && url.length > 0) {
            setPhotoUrl(url);
        } else {
            setPhotoUrl(undefined);
        }

    } catch (error) {
        console.log("Photo error:", error);
        setPhotoUrl(undefined);
    }
};

    return (
        <div
            className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={photoUrl || "/placeholder.jpg"}
                    alt={hotel.hotel_name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="p-5">
                <h2 className="text-xl font-semibold">
                    {hotel.hotel_name}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    {hotel.hotel_address}
                </p>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-green-500" />
                        <span className="font-medium">
                            {hotel.price_per_night}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            / night
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating}</span>
                    </div>
                </div>

                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${hotel.hotel_name}, ${hotel.hotel_address}`
                    )}`}
                    target="_blank"
                >
                    <Button
                        variant="outline"
                        className="mt-5 w-full rounded-xl"
                    >
                        View Hotel
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default HotelCard
