import React from 'react'
import Header from './_component/header';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default Provider
