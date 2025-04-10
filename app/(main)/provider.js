import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"


function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col">
      <SidebarTrigger />
      {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
