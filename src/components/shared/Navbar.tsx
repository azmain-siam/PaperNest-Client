import {
  ShoppingCart,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
  Sofa,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/themeProvider";
import { toast } from "sonner";

interface ILink {
  name: string;
  href: string;
}

export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  address?: string;
  iat: number;
  exp: number;
}

export default function Navbar() {
  const { setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 3000 });
  };

  return (
    <nav className="bg-white backdrop-blur-2xl dark:bg-transparent dark:border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
              PaperNest
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {Navlinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.href}
                className={({ isActive }) => {
                  // console.log(isActive);
                  return !isActive
                    ? "text-gray-700 text-sm dark:text-gray-300 hover:text-primary"
                    : "text-primary font-semibold text-sm";
                }}
              >
                {link.name}
              </NavLink>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 p-0 text-sm active:ring-0 text-foreground/60 hover:text-primary hover:bg-transparent"
                >
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[220px] *:py-2 *:text-sm"
              >
                <DropdownMenuItem>
                  <Link
                    to="/products?categories=furniture"
                    className="flex items-center gap-1.5 w-full"
                  >
                    <Sofa /> Furniture
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="!p-0" />
                <DropdownMenuItem>
                  <Link
                    to="/products?categories=all"
                    className="flex justify-between items-center gap-1.5 w-full"
                  >
                    View All Categories <ChevronRight />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={"/cart"}>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full border cursor-pointer"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="https://i.ibb.co.com/vkcW97y/dummy-man-570x570-1-2.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 font-primary"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1.5">
                      <p className="font-medium leading-none">{user.name}</p>
                      <p className="text-sm leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <Link to={"/dashboard"}>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />

                  <div className="px-2">
                    <Button
                      onClick={handleLogout}
                      className="cursor-pointer w-full my-2"
                    >
                      Logout
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/auth"}>
                <Button className="cursor-pointer">Login</Button>
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              className="bg-red-600"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Navlinks.map((link, idx) => (
                <NavLink
                  to={link.href}
                  key={idx}
                  className={({ isActive }) =>
                    !isActive
                      ? "block px-3 py-2 text-gray-700 hover:text-primary"
                      : "text-primary font-semibold"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const Navlinks: ILink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "About",
    href: "/about",
  },
];
