"use client";
import { Home, Tag, LinkIcon, LogOut } from "lucide-react"
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


// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
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
  const {toast} = useToast();
  const handleLogOut = async () => {
    const res = await logOutAction();
    if(!res){
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
        <Button onClick={handleLogOut}><LogOut /> Log out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

