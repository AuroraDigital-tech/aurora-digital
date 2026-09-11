import { createHash, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { env, isWorkspacePreview } from "@/lib/env.server";
import { siteSettings, type SiteSettings } from "@/lib/site-settings";

const COOKIE = "aurora_admin";
const FILE = "src/lib/site-settings.ts";

function pin(): string | undefined {
  return env("AURORA_ADMIN_PIN");
}

function token(): string | undefined {
  return env("AURORA_GITHUB_TOKEN") ?? env("GITHUB_TOKEN");
}

function sessionValue(secret: string) {
  return createHash("sha256").update(`aurora:${secret}`).digest("hex");
}

function signedIn() {
  const secret = pin();
  const cookie = getCookie(COOKIE);
  if (!secret || !cookie) return false;
  const expected = Buffer.from(sessionValue(secret));
  const got = Buffer.from(cookie);
  return expected.length === got.length && timingSafeEqual(expected, got);
}

function digitsFromDisplay(display: string) {
  const d = display.replace(/\D/g, "");
  if (d.length === 11) return `55${d}`;
  if (d.length === 13 && d.startsWith("55")) return d;
  return "";
}

function clean(raw: SiteSettings): SiteSettings | string {
  const whatsappDisplay = raw.whatsappDisplay.replace(/[^\d()\s-]/g, "").trim().slice(0, 24);
  const whatsappE164 =
    raw.whatsappE164.replace(/\D/g, "").slice(0, 15) || digitsFromDisplay(whatsappDisplay);
  const email = raw.email.trim().toLowerCase().slice(0, 80);
  const instagramHandle = raw.instagramHandle.trim().slice(0, 40);
  const instagramHref = raw.instagramHref.trim().slice(0, 120);
  const city = raw.city.trim().slice(0, 40);
  const state = raw.state.trim().toUpperCase().slice(0, 2);

  if (!/^\d{12,15}$/.test(whatsappE164)) return "WhatsApp inválido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido.";
  if (!/^@?[a-zA-Z0-9._]+$/.test(instagramHandle)) return "Instagram inválido.";
  if (!/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(instagramHref)) {
    return "Link do Instagram inválido.";
  }
  if (city.length < 2) return "Cidade inválida.";
  if (!/^[A-Z]{2}$/.test(state)) return "UF inválida.";

  return {
    whatsappE164,
    whatsappDisplay,
    email,
    instagramHandle: instagramHandle.startsWith("@") ? instagramHandle : `@${instagramHandle}`,
    instagramHref: instagramHref.endsWith("/") ? instagramHref : `${instagramHref}/`,
    city,
    state,
  };
}

function fileContents(s: SiteSettings) {
  return `export type SiteSettings = {
  whatsappE164: string;
  whatsappDisplay: string;
  email: string;
  instagramHandle: string;
  instagramHref: string;
  city: string;
  state: string;
};

export const siteSettings: SiteSettings = {
  whatsappE164: ${JSON.stringify(s.whatsappE164)},
  whatsappDisplay: ${JSON.stringify(s.whatsappDisplay)},
  email: ${JSON.stringify(s.email)},
  instagramHandle: ${JSON.stringify(s.instagramHandle)},
  instagramHref: ${JSON.stringify(s.instagramHref)},
  city: ${JSON.stringify(s.city)},
  state: ${JSON.stringify(s.state)},
};
`;
}

export const adminStatus = createServerFn({ method: "POST" }).handler(async () => {
  return {
    authed: signedIn(),
    configured: Boolean(pin()),
    gitReady: Boolean(token()),
    settings: signedIn() ? siteSettings : null,
  };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { pin: string }) => data)
  .handler(async ({ data }) => {
    const secret = pin();
    if (!secret) return { ok: false as const, error: "Painel ainda sem senha no Vercel." };
    const a = Buffer.from(String(data.pin ?? ""));
    const b = Buffer.from(secret);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false as const, error: "Senha incorreta." };
    }
    setCookie(COOKIE, sessionValue(secret), {
      httpOnly: true,
      secure: !isWorkspacePreview(),
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return { ok: true as const, settings: siteSettings, gitReady: Boolean(token()) };
  });

export const adminSave = createServerFn({ method: "POST" })
  .validator((data: SiteSettings) => data)
  .handler(async ({ data }) => {
    if (!signedIn()) return { ok: false as const, error: "Sessão expirada." };
    const next = clean(data);
    if (typeof next === "string") return { ok: false as const, error: next };
    const gh = token();
    if (!gh) {
      return {
        ok: false as const,
        error: "Falta AURORA_GITHUB_TOKEN no Vercel para gravar no GitHub.",
      };
    }
    const owner = env("AURORA_GITHUB_OWNER") ?? "AuroraDigital-tech";
    const repo = env("AURORA_GITHUB_REPO") ?? "aurora-digital";
    const headers = {
      Authorization: `Bearer ${gh}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    };
    const get = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${FILE}`,
      { headers },
    );
    if (!get.ok) {
      return { ok: false as const, error: "Não foi possível ler o arquivo no GitHub." };
    }
    const current = (await get.json()) as { sha?: string };
    if (!current.sha) return { ok: false as const, error: "Arquivo sem SHA." };
    const put = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${FILE}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: "Atualiza dados de contato da Aurora.",
          content: Buffer.from(fileContents(next)).toString("base64"),
          sha: current.sha,
          branch: "main",
        }),
      },
    );
    if (!put.ok) {
      return { ok: false as const, error: "GitHub recusou a gravação." };
    }
    return { ok: true as const };
  });
