import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "default" | "lg" | "xl";
  text?: string;
  className?: string;
}

export function Loader({ size = "default", text, className }: LoaderProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    default: "h-16 w-16",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 h-screen",
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}
