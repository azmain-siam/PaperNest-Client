import { AppSidebar } from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
// import { ThemeProvider } from "@/components/ui/themeProvider";

export default function Dashboard() {
  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <div className="min-h-screen  font-primary">
      {/* Top Navigation */}
      <DashboardHeader />
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-gray-50">
          <SidebarTrigger />
          <div className="p-4 ">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
    // </ThemeProvider>
  );
}
