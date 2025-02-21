import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="font-primary">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
