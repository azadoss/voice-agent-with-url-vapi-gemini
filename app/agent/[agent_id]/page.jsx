'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Clock, Info, Loader2Icon } from "lucide-react";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner';
import { AgentDataContext } from '@/context/AgentDataContext';

function Agent() {

  const { agent_id } = useParams()
  // console.log(agent_id)
  // const { agent_id } = useRouter().query
  const [agentData, setAgentData] = useState()
  const [userName, setUserName] = useState()
  const [loading, setLoading] = useState(false)
  const { agentInfo, setAgentInfo } = useContext(AgentDataContext)
  const router = useRouter()

  useEffect(() => {
    console.log('Agent ID in useEffect:', agent_id);
    if(agent_id) {
       GetAgentDetails()
    }
  }, [agent_id])

  const GetAgentDetails = async () => {
    setLoading(true);
    try {

      let { data: Agents, error } = await supabase
        .from('Agents')
        .select('title, description, duration, type')
        .eq('agent_id', agent_id)

      setAgentData(Agents[0])
      setLoading(false);
      // console.log('Agents Data:', Agents)
      if (Agents?.length === 0) {
        return toast('Agent not found', {
          variant: 'destructive',
        })
      }


    }
    catch (error) {
      console.log('Error:', error)
      toast('Inccorect agent link', {
        variant: 'destructive',
      })
    }
    finally {
      setLoading(false)
    }
  };

  const onJoinAgent = async () => {
    setLoading(true)
    try {
      let { data: Agents, error } = await supabase
        .from('Agents')
        .select('*')
        .eq('agent_id', agent_id)

      console.log('Agents:', Agents[0])
      setAgentInfo({
        userName:userName,
        agentData: Agents[0],
        // questionList: Agents[0]?.questions,
      });

      router.push(`/agent/${agent_id}/start`)
      // router.push('/agent/' + agent_id + '/start')
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-4'>
      <div className='flex flex-col justify-center items-center border rounded-sm p-7 lg:px-30 xl:px-42 mb-20'>
        <Image src={'/logo.png'} alt='logo' height={600} width={600}
          className='w-[50px] mb-5' />
        <h2>AI Agent powered voice platform</h2>
        <Spline scene="https://prod.spline.design/8SP5oIdMk48a3IVu/scene.splinecode" className='w-[400px] h-[400px]' />

        {/* <Image src={'/swarm.png'} alt='swarm' height={2000} width={2000}
                  className='w-[300px] mb-5' /> */}
        <h2 className="font-bold text-xl">{agentData?.title}</h2>
        <h2 className="flex gap-2 items-center text-muted-foreground mt-5"><Clock className="h-4 w-4" />{agentData?.duration}</h2>

        <div className='w-full mb-6' >
          <h2>Enter your full name</h2>
          <Input placeholder='John Doe' className='mt-3' onChange={(event) => setUserName(event.target.value)} />
        </div>

        <div className="p-5 bg-accent rounded-sm mb-8 flex justify-center gap-4">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold">
              Before you begin
            </h2>
            <ul className="list-disc mt-2">
              <li className="text-sm text-primary">Ensure you have a stable internet connection</li>
              <li className="text-sm text-primary">Ensure you have a stable internet connection</li>
              <li className="text-sm text-primary">Ensure you have a stable internet connection</li>
            </ul>
          </div>
        </div>

        <Button className="mb-10 w-1/2 font-bold"
          disabled={loading || !userName}
          onClick={() => onJoinAgent()}
        >Join Now
          <Loader2Icon className="animate-spin h-4 w-4 ml-2" hidden={!loading} />
        </Button>
      </div>
    </div>
  )
}

export default Agent