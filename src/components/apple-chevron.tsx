import { cn } from "@/lib/utils";

export function AppleChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 16"
      className={cn("inline-block h-[0.85em] w-[0.48em] translate-y-px", className)}
      aria-hidden="true"
    >
      <path
        d="M1.6 1.6 L7.4 8 L1.6 14.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
