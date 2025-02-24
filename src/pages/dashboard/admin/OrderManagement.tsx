import { useState } from "react";
import { MoreHorizontal, Truck, XCircle, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "shipping" | "delivered" | "cancelled";
  items: number;
}

const orders: Order[] = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2024-02-20",
    total: 129.99,
    status: "pending",
    items: 3,
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2024-02-19",
    total: 79.99,
    status: "shipping",
    items: 2,
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    date: "2024-02-18",
    total: 199.99,
    status: "delivered",
    items: 4,
  },
];

export default function OrdersManagement() {
  const [sortedOrders, setSortedOrders] = useState(orders);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setSortedOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders Management</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items} items</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
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
                    {order.status === "pending" && (
                      <DropdownMenuItem
                        onClick={() => updateOrderStatus(order.id, "shipping")}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Mark as Shipping
                      </DropdownMenuItem>
                    )}
                    {order.status === "shipping" && (
                      <DropdownMenuItem
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Delivered
                      </DropdownMenuItem>
                    )}
                    {(order.status === "pending" ||
                      order.status === "shipping") && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "cancelled")
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
  );
}
