import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  // LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Home,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "../shared/Navbar";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  const user = useAppSelector(useCurrentUser) as IUser | null;

  const adminNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      link: "",
      icon: Home,
    },
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
    {
      id: "profile",
      label: "Profile",
      link: "manage-profile",
      icon: Settings,
    },
  ];

  const userNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      link: "",
      icon: Home,
    },
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
    <Sidebar className="pt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <NavLink
                  end
                  to={item.link}
                  className={({ isActive }) =>
                    !isActive
                      ? "text-foreground"
                      : "!bg-primary-second-foreground !text-primary-second hover:!text-primary font-medium"
                  }
                >
                  <SidebarMenuButton
                    size="lg"
                    className="cursor-pointer hover:text-primary-second hover:bg-primary-second-foreground/80"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
