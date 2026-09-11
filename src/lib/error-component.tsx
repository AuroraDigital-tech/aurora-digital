import type { ErrorComponentProps } from "@tanstack/react-router";
import { Wordmark } from "@/components/logo";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message =
    error instanceof Error && error.message
      ? error.message
      : "Algo saiu do lugar. Recarregue ou volte ao início.";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 py-16 text-center text-ink">
      <Wordmark />
      <h1 className="mt-12 max-w-lg text-section text-ink">
        Algo saiu do lugar.
      </h1>
      <p className="mt-5 max-w-md text-body text-muted">{message}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-pill bg-aurora px-5 text-sm font-medium text-snow hover:bg-aurora-hover"
          onClick={() => window.location.replace("/")}
        >
          Ir ao início
        </button>
        <WhatsAppLink className="text-sm font-medium text-aurora hover:text-aurora-hover" />
      </div>
    </main>
  );
}