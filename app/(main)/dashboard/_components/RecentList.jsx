"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function RecentList() {
  const [recentList, setRecentList] = useState([]);
  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">Recent List</h2>
      <div className="my-5">
        {recentList?.length == 0 && (
          <div className="flex flex-col items-center justify-center gap-5 bg-muted p-8 rounded-sm">
            <h2 className="text-lg font-semibold">No recent list</h2>
            <Button>
              <PlusIcon />
              Create New Interview
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentList;
