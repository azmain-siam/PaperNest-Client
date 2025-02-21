import App from "@/App";
import AboutPage from "@/pages/About";
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
        path: "/details",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
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
