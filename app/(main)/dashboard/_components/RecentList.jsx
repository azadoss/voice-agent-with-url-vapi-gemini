"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import ConversationCard from './ConversationCard'
import { toast } from "sonner";
import CreateOptions from "./CreateOptions";

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
         <div className="text-center py-12 bg-muted rounded-lg">
         <p className="text-muted-foreground">No recent yet</p>
         {/* <CreateOptions /> */}
       </div>
        )}

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
