'use client'
import React, {useState} from 'react'
import AgentHeader from './_components/AgentHeader'
import { AgentDataContextProvider } from '@/context/AgentDataContext'

function AgentLayout({children}) {
  const [agentInfo, setAgentInfo] = useState()
  return (
    <AgentDataContextProvider>
    <div>
        <AgentHeader />
        {children}
    </div>
    </AgentDataContextProvider>
  )
}

export default AgentLayout