import { Button } from '@/components/ui/button'
import { Link2, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function ConversationCard({ agents }) {
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
                <h2 className='text-muted-foreground text-xs'>{moment(agents?.created_at).format('llll')}</h2>
            </div>
            <h2 className='font-medium mb-2'>{agents?.title}</h2>
            <h2 className='text-muted-foreground mb-5'>{agents?.duration}</h2>
            <div className='flex gap-3 justify-end'>
                <Button variant='outline' onClick={copyLink}><Link2 />Copy</Button>
                <Button variant='outline' onClick={onShare}><Send />Share</Button> {/* Changed icon and onClick */}
            </div>
        </div>
    )
}

export default ConversationCard