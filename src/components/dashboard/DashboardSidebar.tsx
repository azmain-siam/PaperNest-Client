import { useState } from "react";
import {
  // LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/components/shared/Navbar";

const DashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const user = useAppSelector(useCurrentUser) as IUser | null;

  const adminNavItems = [
    { id: "users", label: "Users", link: "users-management", icon: Users },
    {
      id: "products",
      label: "Products",
      link: "product-management",
      icon: Package,
    },
    {
      id: "orders",
      label: "Orders",
      link: "manage-orders",
      icon: ShoppingCart,
    },
  ];

  const userNavItems = [
    {
      id: "orders",
      label: "My Orders",
      link: "my-orders",
      icon: ShoppingCart,
    },
    { id: "settings", label: "Settings", link: "settings", icon: Settings },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;
  return (
    <aside className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm fixed z-10 flex flex-col pb-5 justify-between">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link to={item.link} key={item.id}>
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="px-4">
        <Link to={"/"}>
          <Button className="w-full cursor-pointer" variant="default">
            <Home className="h-5 w-5" />
            <span className="">Go to home</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
