import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
import { EnterprisePage } from "@/components/enterprise-page";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { isModelo, type Modelo } from "@/lib/modelo";
import { jsonLd } from "@/lib/brand";

type Search = { modelo: Modelo };

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    modelo: isModelo(raw.modelo) ? raw.modelo : "editorial",
  }),
  component: Home,
});

function Home() {
  const { modelo } = Route.useSearch();
  const navigate = Route.useNavigate();

  const setModelo = useCallback(
    (next: Modelo) => {
      try {
        localStorage.setItem("aurora-modelo", next);
      } catch {
        /* ignore */
      }
      navigate({ search: { modelo: next }, replace: true });
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [navigate],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("modelo")) return;
    try {
      const stored = localStorage.getItem("aurora-modelo");
      if (isModelo(stored) && stored !== modelo) {
        navigate({ search: { modelo: stored }, replace: true });
      }
    } catch {
      /* ignore */
    }
  }, [modelo, navigate]);

  return (
    <div id="topo" className="min-h-dvh bg-paper text-ink">
      <a href="#conteudo" className="skip-link">
        Ir ao conteúdo
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav modelo={modelo} onModelo={setModelo} />
      <main id="conteudo">
        {modelo === "enterprise" ? <EnterprisePage /> : <EditorialPage />}
      </main>
      <SiteFooter modelo={modelo} />
    </div>
  );
}
