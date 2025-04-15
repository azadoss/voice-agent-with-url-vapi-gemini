"use client";

import React, { useEffect, useState } from 'react'
import { supabase } from "@/services/supabaseClient";
import { useUser } from '@/app/provider';
import ConversationCard from '../dashboard/_components/ConversationCard';


function AllActiveAgents() {
  const { user } = useUser()
  const [agents, setAgents] = useState()

  useEffect(() => {
    user && GetActiveList();
  }, [user])

  const GetActiveList = async () => {

    let { data: Agents, error } = await supabase
      .from('Agents')
      .select('title, description, duration, agent_id, Conversations(userEmail)')
      .eq('userEmail', user?.email)
      .order('created_at', { ascending: false })

    console.log(Agents)
    setAgents(Agents)
  }

  return (
    <div className='mt-10'>
      <h2 className='text-2xl mb-5'>List of active agents with conversations review</h2>

      {agents?.length == 0 && (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">No recent yet</p>
          {/* <CreateOptions /> */}
        </div>
      )}

      {agents &&
        <div className="grid grid-cols-2 xl:grid-cols-3  gap-5">
          {agents.map((agent, index) => (
            <ConversationCard agents={agent} key={index} 
            viewDetail={true}
            />
          ))}
        </div>

      }
    </div>
  )
}

export default AllActiveAgents