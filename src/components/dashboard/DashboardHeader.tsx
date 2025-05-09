import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "../shared/Navbar";
import { toast } from "sonner";
import { User } from "lucide-react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../ui/themeProvider";

const DashboardHeader = () => {
  // const { setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 3000 });
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      <div className="h-16 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-primary">PaperNest Dashboard</h1>
        <div>
          {/* Toggle theme */}
          {/* <DropdownMenu>
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
          </DropdownMenu> */}

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
                  <AvatarFallback>{user?.name}</AvatarFallback>
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
                  <p className="font-medium leading-none">{user?.name}</p>
                  <p className="text-sm leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
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
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
