'use client'

import Itinerary from '@/app/create-new-trip/_components/itinerary';
import { Trip } from '@/app/my-trip/page';
import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewTrip = () => {
    const { tripId } = useParams();
    const { userDetails, setUserDetails } = useUserDetail();
    const [tripData, setTripData] = useState<Trip>()
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const convex = useConvex();

    useEffect(() => {
        userDetails && getTrip()
    }, [userDetails])

    const getTrip = async () => {
        const result = await convex.query(api.tripDetails.getTripId, {
            uid: userDetails?._id,
            tripId: tripId + '',
        })
        console.log(result);
        setTripData(result);
        setTripDetailInfo(result?.tripDetails);
    }

    return (
        <div className='p-4 md:p-10'>
            <Itinerary />
        </div>
    )
}

export default ViewTrip
