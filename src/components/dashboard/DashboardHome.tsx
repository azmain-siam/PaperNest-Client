"use client";

import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import { IUser } from "../shared/Navbar";

export default function WelcomeSection() {
  // You would typically get this from your auth context
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const userName = user?.name;
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold tracking-tight">
        {getGreeting()}, {userName}! 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to your PaperNest dashboard.
      </p>
    </motion.div>
  );
}
