"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import CreateOptions from "../dashboard/_components/CreateOptions";

import LibraryList from "./_components/LibraryList";

export default function LibraryPage() {
  const [agents, setAgents] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchAgents();
  }, [user]);

  const fetchAgents = async () => {
    let { data, error } = await supabase
      .from('Agents')
      .select('*')
      .eq('userEmail', user.email)
      .order('created_at', { ascending: false });

    if (!error) {
      // Transform questionList to handle both string and object formats
      const transformedData = data.map(agent => ({
        ...agent,
        questionList: agent.questionList?.map(q => 
          typeof q === 'string' ? q : q?.question || ''
        ) || []
      }));
      setAgents(transformedData);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mt-10">
      <h2 className='text-2xl mb-5'>Agents library</h2>
        <CreateOptions />
        {/* <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create New Agent
        </Button> */}
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">No agents created yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {agents.map(agent => (
            <LibraryList key={agent.id} agents={agent} />
          ))}
        </div>
      )}
    </div>
  );
}