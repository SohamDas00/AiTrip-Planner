'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { TypeTrip } from '../create-new-trip/_components/chatbox';
import Image from 'next/image';
import MyTripItem from './_components/myTripItem';

export type Trip = {
    tripDetails: TypeTrip,
    tripId: any,
    _id: string,
}

const Mytrip = () => {
    const [myTrip, setMyTrip] = useState<Trip[]>([]);
    const { userDetails, setUserDetails } = useUserDetail();
    const convex = useConvex();

    useEffect(() => {
        userDetails && getTrip();
    }, [userDetails])

    const getTrip = async () => {
        const result = await convex.query(api.tripDetails.getTripDetails, {
            uid: userDetails?._id
        });
        setMyTrip(result);
        console.log(result);
    }

    return (
        <div className='p-4 md:p-10 md:ml-30'>
            <p className='font-bold text-xl md:text-2xl'>My Trips</p>
            <div>
                {myTrip.length === 0 &&
                    <div className='mt-4'>
                        <p className='text-sm md:text-base'>You dont have any Trip plan created</p>
                        <Link href='/create-new-trip'><Button className='bg-primary p-4 md:p-5 mt-2'>Create new Trip</Button></Link>
                    </div>
                }
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 md:p-5'>
                    {myTrip?.map((trip, index) => (
                        <MyTripItem trip={trip} key={index} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Mytrip