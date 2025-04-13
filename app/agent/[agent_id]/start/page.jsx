'use client'
import React, { useContext } from 'react'
import { Timer, Mic, X } from 'lucide-react'
import { AgentDataContext } from '@/context/AgentDataContext'
import Image from 'next/image'
import Spline from '@splinetool/react-spline'
// import { useUser } from '@/app/provider'

function StartAgent() {
    // const { user } = useUser()

    const { agentInfo, setAgentInfo } = useContext(AgentDataContext)
    return (
        <div className="p-20 lg:p-48 xl:p-56">
            <h2 className='font-bold text-xl flex justify-between'>Start Agent
                <span className='flex gap-2 items-center'>
                    <Timer />
                    00:00:00
                </span>
            </h2>

            <div className='grid drid-cols-1 md:grid-cols-2 gap-7 mt-5'>

                <div className='bg-muted h-[400px] rounded-sm flex flex-col gap-3 justify-center items-center'>
                    {/* <Image src={'/agent.png'} alt='agent' width={512} height={512} className=' h-[60px] w-[60px] object-cover rounded-full' />  */}
                    <h2 className="font-bold mt-5">{agentInfo?.agent_id}</h2>
                    <Spline scene="https://prod.spline.design/8SP5oIdMk48a3IVu/scene.splinecode" className='w-[200px] h-[200px]' />
                </div>
                <div>
                    <div className='bg-muted h-[400px] rounded-sm flex flex-col gap-3 justify-center items-center'>
                        <h2 className="text-2xl bg-primary text-secondery rounded-full p-3 px-5">{agentInfo?.userName[0]}</h2>
                        <h2 className=''>{agentInfo?.userName}</h2>

                        {/* <Image src={user?.picture} alt="dashboard-image" width={40} height={40} className='rounded-full' /> 
                    <br />
                    <h2 className=''>{user?.name}</h2> */}
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-7 mt-10'>
                <Mic className='h-10 w-10 p-2 rounded-full bg-green-500 cursor-pointer' />
                <X className='h-10 w-10 p-2 rounded-full bg-red-500 cursor-pointer' />
                {/* <button className='bg-primary text-secondery px-5 py-2 rounded-sm'>Start</button>
                <button className='bg-muted text-primary px-5 py-2 rounded-sm'>Stop</button> */}
                </div>
                <h2 className="mt-5 text-sm text-muted-foreground text-center">Session started...</h2>
        </div>
    )
}

export default StartAgent