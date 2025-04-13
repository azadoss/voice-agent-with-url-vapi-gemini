import Image from 'next/image'
import React from 'react'

function AgentHeader() {
  return (
    <div className='p-4 shadow-sm'>
      <Image src={'/logo.png'} alt='logo' height={600} width={600}
      className='w-[50px]' />
    </div>
  )
}

export default AgentHeader