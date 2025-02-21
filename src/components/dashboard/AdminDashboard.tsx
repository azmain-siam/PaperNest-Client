import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Clock,
  BarChart,
  PieChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,345",
    icon: DollarSign,
    change: "+12%",
    trend: "up",
  },
  {
    title: "Total Orders",
    value: "156",
    icon: ShoppingCart,
    change: "+8%",
    trend: "up",
  },
  {
    title: "Total Products",
    value: "89",
    icon: Package,
    change: "+5%",
    trend: "up",
  },
  {
    title: "Total Customers",
    value: "2,345",
    icon: Users,
    change: "+15%",
    trend: "up",
  },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2024-02-20",
    status: "Completed",
    total: "$125.00",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2024-02-20",
    status: "Processing",
    total: "$89.99",
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    date: "2024-02-19",
    status: "Completed",
    total: "$245.50",
  },
  {
    id: "ORD004",
    customer: "Sarah Williams",
    date: "2024-02-19",
    status: "Pending",
    total: "$67.25",
  },
];

const products = [
  {
    id: "PRD001",
    name: "Premium Notebook",
    stock: 45,
    price: "$12.99",
    sales: 123,
  },
  {
    id: "PRD002",
    name: "Fountain Pen Set",
    stock: 12,
    price: "$24.99",
    sales: 89,
  },
  {
    id: "PRD003",
    name: "Art Journal",
    stock: 67,
    price: "$15.99",
    sales: 156,
  },
  {
    id: "PRD004",
    name: "Colored Pencils",
    stock: 89,
    price: "$9.99",
    sales: 234,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm">Download Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp
                  className={`h-4 w-4 mr-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                />
                <span
                  className={`text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  <BarChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">
                    Sales Chart Placeholder
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Product Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Product Distribution</CardTitle>
                <CardDescription>Sales by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  <PieChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">
                    Distribution Chart Placeholder
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {order.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your products</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Total Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.stock > 50
                              ? "bg-green-100 text-green-800"
                              : product.stock > 20
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="text-right">
                        {product.sales}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
