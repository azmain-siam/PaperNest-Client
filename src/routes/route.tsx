import App from "@/App";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import AboutPage from "@/pages/About";
import ProductsPage from "@/pages/AllProducts";
import AuthPages from "@/pages/AuthPages";
import CartPage from "@/pages/CartPage";
import OrdersManagement from "@/pages/dashboard/admin/OrderManagement";
import ProductsManagement from "@/pages/dashboard/admin/ProductManagement";
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import ManageProfile from "@/pages/dashboard/user/ManageProfile";
import Orders from "@/pages/dashboard/user/Orders";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth",
        element: <AuthPages />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "manage-orders",
        element: <OrdersManagement />,
      },
      {
        path: "product-management",
        element: <ProductsManagement />,
      },
      {
        path: "users-management",
        element: <UserManagement />,
      },
      {
        path: "my-orders",
        element: <Orders />,
      },
      {
        path: "manage-profile",
        element: <ManageProfile />,
      },
    ],
  },
]);

export default router;
