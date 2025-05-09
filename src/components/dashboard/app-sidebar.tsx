import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  // LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "../shared/Navbar";
import { Link } from "react-router-dom";

export function AppSidebar() {
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
    {
      id: "settings",
      label: "Settings",
      link: "manage-profile",
      icon: Settings,
    },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link to={item.link} className="flex items-center gap-2">
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
