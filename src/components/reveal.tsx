import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const style = delay
    ? ({ animationDelay: `${delay}ms` } satisfies CSSProperties)
    : undefined;

  return (
    <div className={cn("reveal-anim", className)} style={style}>
      {children}
    </div>
  );
}
