import type { Modelo } from "@/lib/modelo";
import { cn } from "@/lib/utils";

const options: { id: Modelo; label: string }[] = [
  { id: "editorial", label: "Editorial" },
  { id: "enterprise", label: "Enterprise" },
];

export function ModelSwitcher({
  modelo,
  onChange,
  tone = "light",
}: {
  modelo: Modelo;
  onChange: (modelo: Modelo) => void;
  tone?: "light" | "dark";
}) {
  return (
    <div
      role="tablist"
      aria-label="Modelos do site"
      className={cn(
        "relative grid grid-cols-2 rounded-pill p-1",
        tone === "light" ? "bg-ink/6" : "bg-snow/10",
      )}
    >
      {options.map((option) => {
        const active = modelo === option.id;
        return (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative z-10 min-h-9 rounded-pill px-4 text-xs font-semibold tracking-wide transition-[color] duration-150",
              active
                ? "text-ink"
                : tone === "light"
                  ? "text-muted hover:text-ink"
                  : "text-on-dark-muted hover:text-on-dark",
            )}
          >
            {active && (
              <span className="absolute inset-0 -z-10 rounded-pill bg-snow shadow-border" />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
