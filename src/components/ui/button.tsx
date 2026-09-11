import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 font-medium select-none whitespace-nowrap disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] transition-[scale,background-color,color,opacity] duration-150 ease-out",
  {
    variants: {
      variant: {
        navy:
          "bg-navy text-on-dark hover:bg-navy-2 rounded-pill px-5 py-2.5 text-sm",
        aurora:
          "bg-aurora text-snow hover:bg-aurora-hover rounded-pill px-5 py-2.5 text-sm",
        ghost:
          "bg-transparent text-ink hover:bg-ink/5 rounded-pill px-4 py-2 text-sm",
        text: "bg-transparent text-aurora hover:text-aurora-hover rounded-none px-0 py-1 text-lead font-normal",
        dark:
          "bg-snow text-ink hover:bg-paper rounded-pill px-5 py-2.5 text-sm",
      },
      size: {
        md: "min-h-11",
        sm: "min-h-10 text-[0.875rem]",
        lg: "min-h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "navy",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { buttonVariants };
