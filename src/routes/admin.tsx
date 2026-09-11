import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Wordmark } from "@/components/logo";
import { adminLogin, adminSave, adminStatus } from "@/lib/admin";
import type { SiteSettings } from "@/lib/site-settings";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel · Aurora Digital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [gitReady, setGitReady] = useState(false);
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void adminStatus().then((s) => {
      setConfigured(s.configured);
      setAuthed(s.authed);
      setGitReady(s.gitReady);
      if (s.settings) setForm(s.settings);
    });
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await adminLogin({ data: { pin } });
    setBusy(false);
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    setAuthed(true);
    setGitReady(res.gitReady);
    setForm(res.settings);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setMsg("");
    const res = await adminSave({ data: form });
    setBusy(false);
    setMsg(res.ok ? "Salvo. O Vercel publica em instantes." : res.error);
  }

  return (
    <main className="min-h-dvh bg-paper px-6 py-16 text-ink">
      <div className="mx-auto w-full max-w-md">
        <Wordmark />
        <p className="mt-10 text-micro uppercase tracking-eyebrow text-subtle">
          Painel
        </p>
        <h1 className="mt-3 text-section">Contato.</h1>

        {!configured ? (
          <p className="mt-8 text-body text-muted">
            No Vercel, em Settings → Environment Variables, crie{" "}
            <code className="text-ink">AURORA_ADMIN_PIN</code> e{" "}
            <code className="text-ink">AURORA_GITHUB_TOKEN</code>. Depois
            publique de novo.
          </p>
        ) : !authed ? (
          <form onSubmit={login} className="mt-10 space-y-5">
            <label className="block text-sm text-muted">
              Senha
              <input
                type="password"
                name="pin"
                autoComplete="current-password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-2 block w-full rounded-control border border-line bg-snow px-4 py-3 text-ink"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-11 items-center rounded-pill bg-aurora px-5 text-sm font-medium text-snow hover:bg-aurora-hover"
            >
              Entrar
            </button>
          </form>
        ) : form ? (
          <form onSubmit={save} className="mt-10 space-y-5">
            {[
              ["whatsappDisplay", "WhatsApp"],
              ["email", "E-mail"],
              ["instagramHandle", "Instagram"],
              ["instagramHref", "Link do Instagram"],
              ["city", "Cidade"],
              ["state", "UF"],
            ].map(([key, label]) => (
              <label key={key} className="block text-sm text-muted">
                {label}
                <input
                  value={form[key as keyof SiteSettings]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="mt-2 block w-full rounded-control border border-line bg-snow px-4 py-3 text-ink"
                />
              </label>
            ))}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-11 items-center rounded-pill bg-aurora px-5 text-sm font-medium text-snow hover:bg-aurora-hover"
            >
              Salvar no GitHub
            </button>
            {!gitReady ? (
              <p className="text-sm text-muted">
                Falta o token do GitHub no Vercel para gravar.
              </p>
            ) : null}
          </form>
        ) : null}

        {msg ? <p className="mt-6 text-sm text-muted">{msg}</p> : null}
      </div>
    </main>
  );
}
