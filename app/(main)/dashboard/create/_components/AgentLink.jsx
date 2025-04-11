import React from "react";
import { Button } from "@/components/ui/button";
import {
  CircleCheckIcon,
  Clock,
  CopyIcon,
  Calendar,
  List,
  MailIcon,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";

function AgentLink({ agentId, formData }) {
  const GetAgentUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + agentId;
    return url;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <CircleCheckIcon className="w-10 h-10 text-green-500" />
      <h2 className="text-2xl font-bold mt-4">Agent Link Created</h2>
      <p className="text-muted-foreground mb-6">
        You can now share the link to start the interview
      </p>

      <div className="w-full bg-muted p-4 rounded-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Agent Link</h2>
          <h2 className="p-1 px-2 text-muted-foreground rounded-sm bg-white">
            Valid for 30 days
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Input defaultValue={GetAgentUrl()} disabled={true} />
          <Button>
            <CopyIcon />
            Copy Link
          </Button>
        </div>
        <hr className="my-7" />

        <div className="flex items-center gap-5">
          <h2 className="text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-muted-foreground flex items-center gap-2">
            <List className="w-4 h-4" />
            10 Questions
          </h2>
          {/* <h2 className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </h2> */}
        </div>
      </div>

      <div className="mt-7 w-full bg-muted p-5 rounded-sm flex items-center gap-5">
        <h2 className="font-bold">Share Link</h2>
        <div className="flex items-center gap-5">
          <Button variant="outline">
            <MailIcon />
            Share Link
          </Button>
          <Button variant="outline">
            <Send />
            Email
          </Button>
          {/* <Button>
            <WhatsappIcon />
            Whatsapp
        </Button> */}
        </div>
      </div>
    </div>
  );
}

export default AgentLink;
