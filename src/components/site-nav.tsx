import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { ModelSwitcher } from "@/components/model-switcher";
import { AppleChevron } from "@/components/apple-chevron";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { brand } from "@/lib/brand";
import type { Modelo } from "@/lib/modelo";
import { cn } from "@/lib/utils";

const editorialLinks = [
  { href: "#metodo", label: "Método" },
  { href: "#sobre", label: "Sobre" },
];

const enterpriseLinks = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#metodo", label: "Método" },
  { href: "#sobre", label: "Sobre" },
];

export function SiteNav({
  modelo,
  onModelo,
}: {
  modelo: Modelo;
  onModelo: (modelo: Modelo) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = modelo === "editorial" ? editorialLinks : enterpriseLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [modelo]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200",
          scrolled || open
            ? "border-ink/8 bg-paper/80 shadow-nav backdrop-blur-xl"
            : "border-transparent bg-paper/40 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-3 px-5 sm:h-16 sm:px-8">
          <a href="#topo" className="shrink-0" aria-label={brand.name}>
            <Wordmark compact />
          </a>

          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <ModelSwitcher modelo={modelo} onChange={onModelo} />
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Seções">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ink-soft hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <WhatsAppLink
              chevron
              className="hidden gap-1 text-sm font-medium text-aurora hover:text-aurora-hover sm:inline-flex"
            />
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-pill text-ink hover:bg-ink/5 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
        <div className="border-t border-ink/6 px-5 py-2 md:hidden">
          <ModelSwitcher modelo={modelo} onChange={onModelo} />
        </div>
      </header>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-0 z-40 bg-paper px-6 pt-32 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Menu">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between border-b border-ink/8 text-title text-ink"
              >
                {link.label}
                <AppleChevron className="text-muted" />
              </a>
            ))}
            <WhatsAppLink
              chevron
              className="mt-8 min-h-16 justify-between text-title text-aurora"
            />
          </nav>
        </div>
      )}
    </>
  );
}

export function SiteFooter({ modelo }: { modelo: Modelo }) {
  return (
    <footer className="bg-paper px-5 pb-16 pt-10 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <div className="hairline mb-10" />
        {modelo === "enterprise" ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Wordmark />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                {brand.tagline}
              </p>
            </div>
            <div>
              <p className="text-caption uppercase tracking-wide text-subtle">Explorar</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>
                  <a href="#solucoes" className="hover:text-ink">
                    Soluções
                  </a>
                </li>
                <li>
                  <a href="#metodo" className="hover:text-ink">
                    Método
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-ink">
                    Sobre
                  </a>
                </li>
                <li>
                  <WhatsAppLink className="hover:text-ink">Pedir orçamento</WhatsAppLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-caption uppercase tracking-wide text-subtle">Contato</p>
              <ContactList />
            </div>
            <div>
              <p className="text-caption uppercase tracking-wide text-subtle">Sede</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Leopoldina, Minas Gerais
                <br />
                Atendemos o Brasil inteiro.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Wordmark />
              <p className="mt-4 text-sm text-muted">{brand.designed}</p>
            </div>
            <ContactList align="end" />
          </div>
        )}
        <p className="mt-12 text-xs text-subtle">
          © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function ContactList({ align = "start" }: { align?: "start" | "end" }) {
  return (
    <ul
      className={cn(
        "space-y-2 text-sm text-ink-soft",
        align === "end" ? "sm:text-right" : "mt-3",
      )}
    >
      <li>
        <WhatsAppLink className="hover:text-ink">
          WhatsApp {brand.whatsappDisplay}
        </WhatsAppLink>
      </li>
      <li>
        <a href={`mailto:${brand.email}`} className="hover:text-ink">
          {brand.email}
        </a>
      </li>
      <li>
        <a
          href={brand.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="hover:text-ink"
        >
          {brand.instagram.handle}
        </a>
      </li>
    </ul>
  );
}
