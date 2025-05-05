import AppSidebar from "@/components/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5 w-full">
        <SidebarTrigger />
        <div className="p-2">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default layout