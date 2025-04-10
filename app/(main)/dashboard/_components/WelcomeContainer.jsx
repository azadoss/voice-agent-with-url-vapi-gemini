'use client'
import React from 'react'
import { useUser } from '@/app/provider'
import Image from 'next/image'

function WelcomeContainer() {
    const { user } = useUser();
  return (
    <div className='bg-muted p-6 rounded-sm flex justify-between items-center'>
        <div>
            <h1 className='text-2xl font-bold'>Welcome back, {user?.name}</h1>
           <h2 className='text-sm text-muted-foreground'>AI Driver Interview</h2>
        </div>
        {user && <Image src={user?.picture} alt="dashboard-image" width={40} height={40} className='rounded-full' /> }
    </div>
  )
}

export default WelcomeContainer