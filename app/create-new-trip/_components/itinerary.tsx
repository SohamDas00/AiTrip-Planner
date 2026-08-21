'use client'
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline';
import { ArrowLeft, Clock, ExternalLink, Star, Target, Ticket, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import HotelCard from './hotelCard';
import DaysItinerary from './daysItinerary';
import { useTripDetail } from '@/app/provider';
import { TripContextType } from '@/app/context/tripDetailContext';
import { TypeTrip } from './chatbox';

const Itinerary = () => {
  const { tripDetailInfo } = useTripDetail();

  const [tripData, setTripData] = useState<TypeTrip | null>(null);

  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);
    }
  }, [tripDetailInfo]);

  const data = tripData
    ? [
      {
        title: "Recommended Hotels",
        content: (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {tripData.hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        ),
      },

      ...tripData.itinerary.map((dayData) => ({
        title: `Day ${dayData.day}`,
        content: <DaysItinerary dayData={dayData} />,
      })),
    ]
    : [];

  return (
    <div className="relative w-full h-[75vh] overflow-auto">
      {tripData ?
        <Timeline
          data={data}
          tripData={tripData}
        />
        :
        <div className="relative w-full h-[75vh]">
          <Image
            src="/travel.png"
            alt="travel image"
            width={800}
            height={800}
            className="rounded-3xl w-full h-full object-cover"
          />
          <h2 className="absolute bottom-5 left-5 text-white font-bold text-2xl flex gap-2 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer">
            <ArrowLeft /> Getting to know you to build perfect trip here...
          </h2>

        </div>

      }
    </div>
  );
};

export default Itinerary
