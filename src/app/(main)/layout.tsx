import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-[calc(100vw-50px)] py-8 px-10">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}  
