import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DeviceStage({
  children,
  className,
  spin = true,
}: {
  children: ReactNode;
  className?: string;
  spin?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const delta = (box.top + box.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-0.7, Math.min(0.7, delta));
      el.style.setProperty("--drift", `${(clamped * -56).toFixed(1)}px`);
      el.style.setProperty("--spin", spin ? `${(clamped * 26).toFixed(2)}deg` : "0deg");
      el.style.setProperty("--glow-y", `${(clamped * -24).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    };
    const reset = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [spin]);

  return (
    <div ref={ref} className={cn("device-stage", className)}>
      <div className="device-glow" aria-hidden />
      {children}
    </div>
  );
}
