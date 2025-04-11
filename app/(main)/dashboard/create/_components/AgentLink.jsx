import React from "react";
import { Button } from "@/components/ui/button";
import {
  CircleCheckIcon,
  Clock,
  CopyIcon,
  List,
  MailIcon,
  Send,
  LinkIcon,
  MessageCircle,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

function AgentLink({ agent_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + agent_id;
  const GetAgentUrl = () => {
    return url;
  };
  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard")
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 sm:mt-10 px-4 sm:px-0">
      <CircleCheckIcon className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
      <h2 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4 text-center">
        Agent Link Created
      </h2>
      <p className="text-sm sm:text-muted-foreground mb-4 sm:mb-6 text-center">
        You can now share the link to start the interview
      </p>

      <div className="w-full max-w-lg bg-muted p-3 sm:p-4 rounded-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-sm sm:text-base">Agent Link</h2>
          <h2 className="p-1 px-2 text-xs sm:text-sm text-muted-foreground rounded-sm bg-white">
            Valid for 30 days
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-3 sm:mt-5">
          <Input defaultValue={GetAgentUrl()} disabled={true} className="text-sm" />
          <Button className="text-sm flex-shrink-0" onClick={() => onCopyLink()}>
            <CopyIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Copy Link</span>
            <span className="sm:hidden">Copy</span>
          </Button>
        </div>
        <hr className="my-4 sm:my-7" />

        <div className="flex items-center justify-around sm:justify-start gap-3 sm:gap-5 text-sm">
          <h2 className="text-muted-foreground flex items-center gap-1 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-muted-foreground flex items-center gap-1 sm:gap-2">
            <List className="w-3 h-3 sm:w-4 sm:h-4" />
            10 Questions
          </h2>
          {/* <h2 className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </h2> */}
        </div>
      </div>

      <div className="mt-5 sm:mt-7 w-full max-w-lg bg-muted p-3 sm:p-5 rounded-sm">
        <h2 className="font-bold text-sm sm:text-base mb-2">Share Link</h2>
        <div className="flex items-center justify-around mt-2 gap-2">
          <Button variant={"outline"} className={"w-3/10 text-xs sm:text-sm justify-center gap-2"}>
            <MailIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant={"outline"} className={"w-3/10 text-xs sm:text-sm justify-center gap-2"}>
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </Button>
          <Button variant={"outline"} className={"w-3/10 text-xs sm:text-sm justify-center gap-2"}>
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Whatsapp</span>
          </Button>
        </div>
      </div>
      <div className="mt-5 sm:mt-7 w-full max-w-lg flex items-center justify-between gap-2">
        <Link href={'/dashboard'}>
          <Button variant={'outline'}> <ArrowLeft />Back to Dashboard</Button>
        </Link>
        <Link href={'/dashboard/create'}>
          <Button variant={'outline'}> <LinkIcon />Create New Link</Button>
        </Link>
      </div>

    </div>
  );
}

export default AgentLink;