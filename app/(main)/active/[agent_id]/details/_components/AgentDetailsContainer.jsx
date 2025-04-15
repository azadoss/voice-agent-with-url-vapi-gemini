import { Boxes, Clock, Database, SquarePlus } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function AgentDetailsContainer({ agentDetails }) {
  return (
    <div className='bg-card border border-border rounded-sm p-5 max-w-5xl mx-auto"'>
      <h2 className='font-bold text-xl'>{agentDetails?.title}</h2>

      <div className='mt-4 flex items-center justify-between'>
        <div>
          <h2 className='text-xs text-muted-foreground flex items-center'><Clock className='w-3 h-3 mr-1' />Duration</h2>
          <h2 className='flex items-center gap-2 font-medium'>
            {agentDetails?.duration}
          </h2>
        </div>
        <div>
          <h2 className='text-xs text-muted-foreground flex items-center'><Database className='w-3 h-3 mr-1' />Created</h2>
          <h2 className='flex items-center gap-2 font-medium'>
            {moment(agentDetails?.created_at).startOf('day').fromNow()}
          </h2>
        </div>
        {agentDetails?.type && <div>
          <h2 className='text-xs text-muted-foreground flex items-center'><Boxes className='w-3 h-3 mr-1' />Type</h2>
          <h2 className='flex items-center gap-2 font-medium'>
            {JSON.parse(agentDetails?.type)[0]}
          </h2>
        </div>}
      </div>

      <div className='mt-9'>
        <h2 className='text-lg mb-3'>Description</h2>
        <p className='leading-6'>{agentDetails?.description}</p>
      </div>

      <div className='mt-9'>
        <h2 className='text-lg mb-3'>Questions list</h2>
        <div className="columns-2 col-gap-3">
          {agentDetails?.questionList.map((item, index) => (
            <div key={index} className='bg-card border border-border p-4 rounded-sm text-sm break-inside-avoid mb-3'>{index + 1}.{item?.question}</div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AgentDetailsContainer