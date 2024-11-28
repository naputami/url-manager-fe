"use client";
import { Tag, LinkIcon, LogOut, Loader2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/app/_components/ui/sidebar";
import { Button } from "./ui/button";
import {logOutAction} from "@/app/(main)/action";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState } from "react";


// Menu items.
const items = [
  {
    title: "Category",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Link",
    url: "/links",
    icon: LinkIcon,
  },
]



export function AppSidebar() {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const handleLogOut = async () => {
    setLoading(true);
    const res = await logOutAction();
    if(!res){
      setLoading(false);
      toast({
        title: "Login failed",
        description: "Try again later",
        variant: "destructive",
    })
    }

  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogOut} disabled={loading}>{loading ? <Loader2 /> : <LogOut />} Log out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

