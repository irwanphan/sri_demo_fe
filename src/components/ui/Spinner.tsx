import { cn } from "@/lib/format";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const SIZE: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-3.5 w-3.5 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function Spinner({ size = "md", className, label }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label ?? "Memuat"}
      className={cn(
        "inline-block animate-spin rounded-full border-slate-300 border-t-brand-600",
        SIZE[size],
        className,
      )}
    />
  );
}
