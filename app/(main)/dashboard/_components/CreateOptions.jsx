'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

function CreateOptions() {
    const router = useRouter();
  return (
    <div>
    {/* <h2 className='text-2xl font-bold mt-8'>Create</h2> */}
        {/* <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'> */}
        <div>
            <div>
            <Button onClick={() => router.push('/dashboard/create')}>
            <Plus />
                <h2 className='text-lg font-medium' >Create New</h2>
            </Button>
            </div>
            {/* <div className='bg-muted p-6 rounded-sm'>
                <h2 className='text-xl font-bold'>Create Phone call</h2>
            </div> */}
        </div>
    </div>
  )
}

export default CreateOptions