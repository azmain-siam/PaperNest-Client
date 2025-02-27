import { IUser } from "@/components/shared/Navbar";
import {
  useCurrentToken,
  useCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser) as IUser | null;

  if (!token) {
    return <Navigate to={"/auth"} replace={true} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
};

export default AdminRoute;
