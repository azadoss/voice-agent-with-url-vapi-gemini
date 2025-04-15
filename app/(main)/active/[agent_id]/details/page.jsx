"use client"
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AgentDetailsContainer from './_components/AgentDetailsContainer'
import UsersList from './_components/UsersList'

function AgentDetails() {
    const { agent_id } = useParams()
    const { user } = useUser()
    const [agentDetails, setAgentDetails] = useState()

    useEffect(() => {
        user && GetAgentDetails()
    }, [user])


    const GetAgentDetails = async () => {

        const result = await supabase
            .from('Agents')
            .select(`
                created_at, 
                title, 
                description, 
                type, 
                questionList, 
                duration, 
                agent_id, 
                Conversations(userEmail, userName, feedback, created_at)
                `)
            .eq('userEmail', user?.email)
            .eq('agent_id', agent_id)
            .order('created_at', { ascending: false })

        console.log(result)
        setAgentDetails(result?.data[0])
    }

    return (
        <div className='mt-10'>
            <h2 className='text-2xl mb-5'>Agent details</h2>
            <AgentDetailsContainer agentDetails={agentDetails} />
            <UsersList userDetails={agentDetails?.['Conversations']}/>
        </div>
    )
}

export default AgentDetails