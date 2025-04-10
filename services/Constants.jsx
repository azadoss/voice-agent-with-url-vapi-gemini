import { LayoutDashboard, Calendar, List, Settings, CreditCard } from "lucide-react";

export const SideBarOptions = [
   {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
   },
   {
      label: "Scheduled Interview",
      icon: Calendar,
      path: "/scheduled-interview",
   },
   {
      label: "Interview History",
      icon: List,
      path: "/all-interviews",
   },
   {
      label: "Billing",
      icon: CreditCard,
      path: "/billing",
   },
   {
      label: "Settings",
      icon: Settings,
      path: "/settings"
   },
   
   
]   
