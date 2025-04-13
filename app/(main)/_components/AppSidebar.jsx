'use client'
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
import { ChevronUp, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  console.log(path);

  return (
    <Sidebar>
      <SidebarHeader className="flex">
        <Image
          src="/logo.png"
          alt="logo"
          width={600}
          height={600}
          className="w-[28px] mb-5"
        />
        <Button className={"w-full mt-6"}>
          {" "}
          <Plus />
          Create New Dialog
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="p-2">Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((option) => (
                <SidebarMenuItem key={option.label} className="p-1">
                  <SidebarMenuButton asChild className={`p-2 ${path === option.path ? "bg-muted text-white" : ""}`}>
                    <Link href={option.path}>
                      <option.icon className={`${path === option.path ? "text-primary" : ""}`}/>
                      <span className={`text-lg ${path === option.path ? "text-primary" : ""}`}>{option.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
