import { useState } from "react";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src="/brand/mark.webp"
      alt=""
      width={64}
      height={64}
      draggable={false}
      decoding="async"
      fetchPriority="high"
      onError={() => setOk(false)}
      className={cn("mark block size-8 object-contain object-center", className)}
    />
  );
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Mark className={compact ? "size-8" : "size-9"} />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-[-0.04em] text-ink">
          Aurora
        </span>
        <span className="text-micro font-medium tracking-[0.18em] text-muted uppercase">
          Digital
        </span>
      </span>
    </span>
  );
}
