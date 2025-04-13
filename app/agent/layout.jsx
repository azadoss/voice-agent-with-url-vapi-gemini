import React from 'react'
import AgentHeader from './_components/AgentHeader'

function AgentLayout({children}) {
  return (
    <div>
        <AgentHeader />
        {children}
    </div>
  )
}

export default AgentLayout