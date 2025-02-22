import App from "@/App";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import AboutPage from "@/pages/About";
import ProductsPage from "@/pages/AllProducts";
import AuthPages from "@/pages/AuthPages";
import CartPage from "@/pages/CartPage";
import Dashboard from "@/pages/Dashboard";
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
    element: <Dashboard />,
  },
]);

export default router;
