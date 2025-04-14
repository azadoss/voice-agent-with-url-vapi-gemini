"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import ConversationCard from './ConversationCard'
import { toast } from "sonner";

function RecentList() {
  const [recentList, setRecentList] = useState([]);
  const { user } = useUser()

  useEffect(() => {
    user && GetReviewList()
  }, [user])

  const GetReviewList = async () => {

    let { data: Agents, error } = await supabase
      .from('Agents')
      .select('*')
      .eq('userEmail', user?.email)
      .order('created_at', {ascending: false})
      .limit(3) // limited to six recent records from DB

    console.log('Agents:',Agents)
    setRecentList(Agents)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mt-10 mb-5">Recent List</h2>
        {recentList?.length == 0 && (
          <div className="flex flex-col items-center justify-center gap-5 bg-muted p-8 rounded-sm">
            <h2 className="text-lg font-semibold">No recent list</h2>
            <Button>
              <PlusIcon />
              Create New Interview
            </Button>
          </div>)}

        {recentList&&
        <div className="grid grid-cols-2 xl:grid-cols-3  gap-5">
          {recentList.map((agent,index)=>(
            <ConversationCard agents={agent} key={index} />
          ))}
        </div>

        }

    </div>
  );
}

export default RecentList;
