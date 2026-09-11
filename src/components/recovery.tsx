import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { Wordmark } from "@/components/logo";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function NotFoundScreen() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.location.replace("/");
    }, 4000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 py-16 text-center text-ink">
      <Wordmark />
      <p className="mt-12 text-micro uppercase tracking-eyebrow text-subtle">
        404
      </p>
      <h1 className="mt-4 max-w-lg text-section text-ink">
        Essa página não existe.
      </h1>
      <p className="mt-5 max-w-sm text-body text-muted">
        Levamos você de volta ao início.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <a
          href="/"
          className="inline-flex min-h-11 items-center rounded-pill bg-aurora px-5 text-sm font-medium text-snow hover:bg-aurora-hover"
        >
          Ir ao início
        </a>
        <WhatsAppLink className="text-sm font-medium text-aurora hover:text-aurora-hover" />
      </div>
    </main>
  );
}

export function RecoveryGuardian() {
  useEffect(() => {
    const reloadOnce = (reason: string) => {
      try {
        const key = `aurora-recover:${reason}`;
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, "1");
      } catch {
        return;
      }
      window.location.replace("/");
    };

    const onError = (event: ErrorEvent) => {
      const msg = event.message || "";
      if (
        /Loading chunk|dynamically imported module|ChunkLoadError|Failed to fetch/i.test(
          msg,
        )
      ) {
        reloadOnce("chunk");
      }
    };

    const onReject = (event: PromiseRejectionEvent) => {
      const msg = String(event.reason ?? "");
      if (/Loading chunk|dynamically imported module|ChunkLoadError/i.test(msg)) {
        reloadOnce("chunk");
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
    };
  }, []);

  return null;
}

export function SafeImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img {...props} onError={() => setOk(false)} />;
}