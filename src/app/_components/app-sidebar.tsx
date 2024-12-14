"use client";
import { Tag, LinkIcon, LogOut, Loader2, MenuSquareIcon } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/app/_components/ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { logOutAction } from "@/app/(main)/action";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@/infrastructure/interfaces/entities";
import { useProfileContext } from "@/context/profile";


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MenuSquareIcon,
  },
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
  const { toast } = useToast();
  const {setProfile, user} = useProfileContext();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const data: Partial<User> = JSON.parse(userData);
      setProfile(data);
    }
  }, [])


  const handleLogOut = async () => {
    setLoading(true);
    const res = await logOutAction();
    if(!res){
      setLoading(false);
      toast({
        title: "Logout failed",
        description: "Try again later",
        variant: "destructive",
    }) 
    } else {
      localStorage.removeItem("user");
      setProfile({name: '', email: ''});
    }

  }
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex space-x-2 items-center">
        <Avatar>
          <AvatarFallback>{user?.name?.slice(0,1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-sm font-light">{user?.email}</p>
        </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
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

