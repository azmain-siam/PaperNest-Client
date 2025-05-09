import { MoreHorizontal, UserX, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { IUser } from "@/components/shared/Navbar";
import { toast } from "sonner";
import { Loader } from "@/components/shared/Loader";

export default function UserManagement() {
  const { data, isLoading, refetch } = useGetUserQuery(undefined);
  const [updateUser, { error }] = useUpdateUserMutation();
  const users = data?.data as IUser[];

  const toggleUserStatus = async (user: IUser) => {
    try {
      const status = user.status === "active" ? "inactive" : "active";

      const res = await updateUser({ userId: user._id, status });

      if (res.data.statusCode === 200) {
        toast.success("Updated user status");
        refetch();
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users Management</h2>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Join Date</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                {/* <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell> */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {/* <DropdownMenuItem
                      onClick={() =>
                        (window.location.href = `mailto:${user.email}`)
                      }
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator /> */}
                      <DropdownMenuItem
                        onClick={() => toggleUserStatus(user)}
                        className={
                          user.status === "active"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {user.status === "active" ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate User
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate User
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
