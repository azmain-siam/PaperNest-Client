import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-primary">
      {/* Top Navigation */}
      <DashboardHeader />

      <div className="flex">
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
