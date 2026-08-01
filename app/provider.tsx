'use client'

import React, { useEffect } from 'react'
import Header from './_component/header';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const addUser = useMutation(api.user.createUser);
  const { user } = useUser();

  useEffect(() => {
    user && createUser();
  }, [user])

  const createUser = async () => {
    console.log("user called");
    if (user) {
      const result = await addUser({
        name: user?.fullName ?? '',
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user?.imageUrl ?? '',
      })
      console.log(result);
    }
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Provider
