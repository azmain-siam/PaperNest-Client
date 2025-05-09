import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="font-primary bg-secondary/5">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
