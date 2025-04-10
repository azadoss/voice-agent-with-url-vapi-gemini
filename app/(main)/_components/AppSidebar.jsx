import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Image from "next/image";
import { SideBarOptions } from "@/services/Constants";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex">
        <Image
          src="/logo.png"
          alt="logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <Button className={"w-full mt-6"}>
          {" "}
          <Plus />
          Create New Dialog
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((option) => (
                <SidebarMenuItem key={option.label}>
                  <SidebarMenuButton asChild>
                    <Link href={option.path}>
                    <option.icon />
                    <span>{option.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
