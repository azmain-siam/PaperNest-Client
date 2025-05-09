import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "../shared/Navbar";
import { toast } from "sonner";

const DashboardHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 3000 });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="h-16 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-primary">PaperNest Dashboard</h1>
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
                <p className="font-medium leading-none">{user?.name}</p>
                <p className="text-sm leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

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
    </header>
  );
};

export default DashboardHeader;
