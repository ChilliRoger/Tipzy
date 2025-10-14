import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-transform active:scale-[0.98]";
  const variants: Record<string, string> = {
    primary: "bg-[--color-primary] text-white hover:opacity-95 shadow-md",
    secondary: "border border-[--color-primary] text-[--color-primary] hover:bg-[--color-secondary]",
    ghost: "text-[--color-text]/80 hover:text-[--color-primary]",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}


