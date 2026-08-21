'use client'

import React, { useContext, useEffect, useState } from 'react'
import Header from './_component/header';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from './context/userDetailContext';
import { TripContextType, TripDetailContext } from './context/tripDetailContext';
import { TypeTrip } from './create-new-trip/_components/chatbox';

const Provider = ({children,}: 
  Readonly<{children: React.ReactNode;}>) => {

  const addUser = useMutation(api.user.createUser);
  const { user } = useUser();

  const [userDetails, setUserDetails] = useState<any>();

  const [tripDetailInfo, setTripDetailInfo] = useState<TypeTrip | null>(null);

  useEffect(() => {
    if (user) {
      createUser();
    }
  }, [user]);

  const createUser = async () => {
    if (user) {
      const result = await addUser({
        name: user.fullName ?? '',
        email: user.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user.imageUrl ?? '',
      });

      setUserDetails(result);
    }
  }

  return (
    <UserDetailContext.Provider
      value={{ userDetails, setUserDetails }}
    >
      <TripDetailContext.Provider
        value={{ tripDetailInfo, setTripDetailInfo }}
      >
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
}

export const useTripDetail = (): TripContextType => {
  const context = useContext(TripDetailContext);

  if (!context) {
    throw new Error(
      "useTripDetail must be used inside TripDetailContext.Provider"
    );
  }

  return context;
}