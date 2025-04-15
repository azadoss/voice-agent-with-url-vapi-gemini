import { Button } from '@/components/ui/button'
import { Link2, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function ConversationCard({ agents, viewDetail=false }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + agents?.agent_id;
    const copyLink = () => {
        navigator.clipboard.writeText(url)
        toast('Link copied')
    }

    const onShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: agents?.title, // You can customize this
                    url: url,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    toast.error('Sharing failed.');
                    console.error(error);
                }
            }
        } else {
            copyLink(); // Fallback to copy link if Web Share API is not supported
        }
    }

    return (
        <div className='p-6 bg-muted rounded-sm boder'>
            <div className='flex items-center justify-between mb-2'>
                <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
                <h2 className='text-muted-foreground text-xs'>{moment(agents?.created_at).startOf('day').fromNow()}</h2>
            </div>
            <h2 className='font-medium mb-2'>{agents?.title}</h2>
            <h2 className='flex justify-between text-muted-foreground mb-5'>{agents?.duration}
                <span>{agents['Conversations']?.length} Conversations</span>
            </h2>
            {!viewDetail? <div className='flex gap-3 justify-end'>
                <Button variant='outline' onClick={copyLink}><Link2 />Copy</Button>
                <Button variant='outline' onClick={onShare}><Send />Share</Button> {/* Changed icon and onClick */}
            </div>
            :
            <Link href={'/active/'+agents?.agent_id+'/details'}>
            <Button variant='outline' className='mt-5 w-full'>See details</Button></Link>
            }
        </div>
    )
}

export default ConversationCard