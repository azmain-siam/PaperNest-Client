"use client";

import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import { IUser } from "../shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";
import {
  useCalculateRevenueQuery,
  useGetOrdersByUserQuery,
} from "@/redux/features/orders/ordersApi";
import { Skeleton } from "../ui/skeleton";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { useEffect, useState } from "react";
import { IOrder } from "@/pages/dashboard/admin/OrderManagement";

export default function WelcomeSection() {
  // You would typically get this from your auth context
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const userName = user?.name;
  const { data, isLoading } = useCalculateRevenueQuery([]);
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery([]);

  const { data: orders, isLoading: ordersLoading } = useGetOrdersByUserQuery(
    user?.id
  );
  const [completedOrders, setCompletedOrders] = useState(0);
  // const currentHour = new Date().getHours();

  // const getGreeting = () => {
  //   if (currentHour < 12) return "Good morning";
  //   if (currentHour < 18) return "Good afternoon";
  //   return "Good evening";
  // };

  useEffect(() => {
    const calculateCompletedOrders = () => {
      const delivered = orders?.data?.filter(
        (order: IOrder) => order.status === "delivered"
      );

      setCompletedOrders(delivered?.length);
    };

    if (user?.role === "user") {
      calculateCompletedOrders();
    }
  }, [orders?.data, user?.role]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userName}! Here&apos;s an overview of your activity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.role === "admin" ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sales
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {!isLoading ? (
                      "$" + data.data.totalRevenue.toLocaleString()
                    ) : (
                      <Skeleton className="w-[50px] h-[25px] rounded-full mb-2 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+12.5% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {!isProductsLoading ? (
                      products.data.length
                    ) : (
                      <Skeleton className="w-[50px] h-[25px] rounded-full mb-2 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+2 new this week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Sales
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {!isLoading ? (
                      data.data.totalCompletedOrders
                    ) : (
                      <Skeleton className="w-[50px] h-[25px] rounded-full mb-2 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    <span>-1 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {!ordersLoading ? (
                      orders.data.length
                    ) : (
                      <Skeleton className="w-[50px] h-[25px] rounded-full mb-2 bg-gray-200" />
                    )}
                  </div>
                  {/* <div className="flex items-center text-xs text-red-500">
               <ArrowDownRight className="mr-1 h-3 w-3" />
               <span>-1 from last month</span>
             </div> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Completed Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {!ordersLoading ? (
                      completedOrders
                    ) : (
                      <Skeleton className="w-[50px] h-[25px] rounded-full mb-2 bg-gray-200" />
                    )}
                  </div>
                  {/* <div className="flex items-center text-xs text-red-500">
               <ArrowDownRight className="mr-1 h-3 w-3" />
               <span>-1 from last month</span>
             </div> */}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>
                    Your sales activity for the past 30 days.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest transactions and updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="rounded-full bg-orange-100 p-2">
                          {i % 2 === 0 ? (
                            <ShoppingCart className="h-4 w-4 text-orange-500" />
                          ) : (
                            <DollarSign className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {i % 2 === 0 ? "New purchase" : "Sale completed"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {i % 2 === 0
                              ? "You purchased Vintage Desk Lamp"
                              : "Leather Sofa sold for $350"}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i === 1
                            ? "Just now"
                            : i === 2
                            ? "2h ago"
                            : i === 3
                            ? "Yesterday"
                            : "3d ago"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent
            value="analytics"
            className="h-[400px] flex items-center justify-center bg-muted rounded-md"
          >
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Detailed analytics will appear here.
              </p>
            </div>
          </TabsContent>
          <TabsContent
            value="reports"
            className="h-[400px] flex items-center justify-center bg-muted rounded-md"
          >
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">Reports Dashboard</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your custom reports will appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs> */}
      </div>
    </motion.div>
  );
}
