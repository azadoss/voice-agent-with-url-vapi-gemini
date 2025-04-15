"use client";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Link2, Send, ChevronDown, ChevronUp, Link, ChevronLast, ChevronRight } from 'lucide-react';
import moment from 'moment';
import { toast } from 'sonner';
import { AgentType } from "@/services/Constants";

function LibraryList({ agents }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${agents?.agent_id}`;
    const types = Array.isArray(agents?.type) ? agents.type : [agents?.type];

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast.info('Link copied to clipboard');
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: agents?.title,
                    text: `Check out this interview agent: ${agents?.description}`,
                    url: url,
                });
            } else {
                copyLink();
            }
        } catch (error) {
            if (!error.toString().includes('AbortError')) {
                toast.error('Failed to share');
            }
        }
    };


    return (
        <div className='p-6 bg-card rounded-sm border hover:border-primary transition-colors'>
            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <div>
                        <h2 className='text-xl font-medium'>{agents?.title}</h2>

                    </div>
                </div>
                <p className='text-xs text-muted-foreground'>
                    {moment(agents?.created_at).format('MMM D, YYYY h:mm A')}
                </p>
            </div>

            {agents?.description && (
                <div className="flex items-center mb-4">
                    {/* <p className='line-clamp-2'>
                        {agents.description}
                    </p> */}
                    <p>
                        {agents.description.length > 200
                            ? `${agents.description.slice(0, 200)}...`
                            : agents.description}
                    </p>
                    <Button variant="ghost"
                        size="sm"
                        onClick={() => goToDetails()}
                        className="gap-2">
                        <ChevronRight className="text-primary" />
                    </Button>
                </div>

            )}

            <div className="flex items-center gap-2 flex-wrap">
                <span className='text-xs font-bold p-1 px-2 rounded-sm border border-border'>
                    {agents?.duration}
                </span>
                <div className='flex gap-2'>
                    {agents?.type && JSON.parse(agents.type).map((type, index) => (
                        <div key={index}
                            className='flex justify-start items-center p-1 px-2 rounded-sm border text-xs text-muted-foreground border-border'>
                            {type}
                        </div>
                    ))}
                </div>


                <div className="flex-grow" />

                <div className='flex justify-end gap-2 flex-wrap'>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={copyLink}
                        className="gap-2"
                    >
                        <Link2 className="h-4 w-4" />
                        Copy
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="gap-2"
                    >
                        <Send className="h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default LibraryList;