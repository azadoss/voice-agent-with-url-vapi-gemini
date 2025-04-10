import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex flex-col w-full py-12 px-6">
        <WelcomeContainer/>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
