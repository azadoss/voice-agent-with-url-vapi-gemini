import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function UsersList({ userDetails }) {
    return (
        <div className='mt-9'>
            <h2 className='text-xl mb-8'>Users ({userDetails?.length})</h2>
            {userDetails?.map((user, index) => (
                <div key={index} className='p-5 flex gap-3 items-center justify-between bg-muted rounded-full'>
                    <div className='flex items-center gap-3'>
                        <h2 className='bg-primary font-bold p-3 px-5 rounded-full'>{user.userName[0]}</h2>
                        <div>
                            <h2 className='font-bold text-sm'>{user?.userName}</h2>
                            <h2 className='text-xs text-muted-foreground mt-1'>Joined on: {moment(user?.created_at).format('llll')}</h2>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <h2  className='text-green-500'>6/10</h2>
                        <Button variant="ghost">See More<ChevronRight className="align-icon" /></Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UsersList