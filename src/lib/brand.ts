import { siteSettings } from "@/lib/site-settings";

export const brand = {
  name: "Aurora Digital",
  short: "Aurora",
  city: siteSettings.city,
  state: siteSettings.state,
  region: `${siteSettings.city}, ${siteSettings.state} · Todo o Brasil`,
  domain: "auroradigital.com.br",
  whatsappE164: siteSettings.whatsappE164,
  whatsappDisplay: siteSettings.whatsappDisplay,
  whatsappIntro: "Olá, Aurora Digital. Vim pelo site e quero um orçamento.",
  email: siteSettings.email,
  instagram: {
    handle: siteSettings.instagramHandle,
    href: siteSettings.instagramHref,
  },
  eyebrow: "Tecnologia · Automação · Soluções digitais",
  tagline: "Simplifica. Automatiza. Conecta.",
  designed: "De Leopoldina, para o Brasil.",
  closing: "Tecnologia para um amanhã melhor.",
} as const;

export const services = [
  {
    id: "sites",
    name: "Sites",
    title: "Sites profissionais",
    line: "Páginas que apresentam o negócio com a clareza de um produto.",
    body: "Presença digital direta. Sem templates genéricos. Sem a sensação de agência distante.",
  },
  {
    id: "automacao",
    name: "Automação",
    title: "Automações inteligentes",
    line: "O trabalho repetitivo sai da frente. O processo continua.",
    body: "Fluxos que ligam o que hoje vive em planilha, WhatsApp e memória.",
  },
  {
    id: "documentos",
    name: "Documentos",
    title: "Documentos digitais",
    line: "Propostas, registros e contratos que não se perdem em pasta.",
    body: "Do papel à operação. Organizado, rastreável, pronto para crescer.",
  },
  {
    id: "divulgacao",
    name: "Divulgação",
    title: "Divulgação",
    line: "Presença profissional. Sem teatro. Sem ruído.",
    body: "A marca no lugar certo, com a mesma disciplina do produto.",
  },
] as const;

export const method = [
  {
    n: "01",
    name: "Contato",
    line: "Você conta o que precisa e qual problema quer resolver.",
  },
  {
    n: "02",
    name: "Diagnóstico",
    line: "Analisamos a solução certa: site, automação, documento — ou a combinação.",
  },
  {
    n: "03",
    name: "Proposta",
    line: "Orçamento claro. Prazo e escopo definidos. Sem letras miúdas.",
  },
  {
    n: "04",
    name: "Entrega",
    line: "Construímos, ajustamos e colocamos no ar. Com alguém do outro lado.",
  },
] as const;

export const promises = [
  {
    name: "Tecnologia acessível",
    line: "Sob medida, sem a complexidade — nem o preço — de uma grande agência.",
  },
  {
    name: "Confiança e transparência",
    line: "Escopo e valor claros desde o primeiro sim. Sem surpresas no caminho.",
  },
  {
    name: "Suporte próximo",
    line: "Você fala com quem faz. Do primeiro contato ao ajuste final.",
  },
] as const;

export function whatsappHref(text: string = brand.whatsappIntro) {
  const clean = text.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 400);
  const q = new URLSearchParams({
    phone: brand.whatsappE164,
    text: clean,
    type: "phone_number",
    app_absent: "0",
  });
  return `https://api.whatsapp.com/send?${q.toString()}`;
}

const WHATSAPP_HOST = /^https:\/\/api\.whatsapp\.com\/send\?/;

export function safeWhatsAppHref(text: string = brand.whatsappIntro) {
  const href = whatsappHref(text);
  if (!WHATSAPP_HOST.test(href) || !href.includes(brand.whatsappE164)) {
    return `https://api.whatsapp.com/send?phone=${brand.whatsappE164}`;
  }
  return href;
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  url: `https://${brand.domain}`,
  telephone: `+${brand.whatsappE164}`,
  email: brand.email,
  image: `https://${brand.domain}/brand/mark.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: brand.city,
    addressRegion: brand.state,
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "Country",
    name: "BR",
  },
  sameAs: [brand.instagram.href],
  slogan: brand.tagline,
} as const;
