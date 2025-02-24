import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-primary">
      {/* Top Navigation */}
      <DashboardHeader />

      <div className="flex">
        <div className="hidden md:block md:relative h-full">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 py-6 pr-8 ml-0 md:ml-64 lg:ml-72">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
