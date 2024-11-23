import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-[calc(100vw-250px)] p-8">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}  
