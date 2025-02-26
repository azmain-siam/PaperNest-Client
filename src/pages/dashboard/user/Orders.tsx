import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, XCircle } from "lucide-react";
import { IOrder } from "../admin/OrderManagement";
import {
  useGetOrdersByUserQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/orders/ordersApi";
import { toast } from "sonner";
import { IUser } from "@/components/shared/Navbar";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const Orders = () => {
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const { data, isLoading, refetch } = useGetOrdersByUserQuery(user?.id);
  const orders = data?.data as IOrder[];
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleChangeStatus = async (
    orderId: string,
    newStatus: IOrder["status"]
  ) => {
    const res = await updateOrderStatus({ orderId, status: newStatus });

    if (res.data.success) {
      toast.success("Order status updated successfully");
      refetch();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Orders</h2>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {order.products.length}{" "}
                  {order.products.length > 1 ? "items" : "item"}
                </TableCell>
                <TableCell>${/* {order.total.toFixed(2)} */}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "default"
                        : order.status === "shipping"
                        ? "secondary"
                        : order.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      {(order.status === "pending" ||
                        order.status === "shipping") && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeStatus(order._id, "cancelled")
                            }
                            className="text-red-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </>
                      )}
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
};

export default Orders;
