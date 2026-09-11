import { Reveal } from "@/components/reveal";
import { AppleChevron } from "@/components/apple-chevron";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { DeviceStage } from "@/components/device-stage";
import { SafeImg } from "@/components/recovery";
import { brand, method, services } from "@/lib/brand";

export function EditorialPage() {
  return (
    <div className="page-in bg-paper text-ink">
      <section className="relative mx-auto flex min-h-[calc(100dvh-6.5rem)] max-w-[1120px] flex-col justify-center px-5 pb-20 pt-10 sm:px-8 md:min-h-[calc(100dvh-4rem)] md:pt-6">
        <p
          className="hero-rise text-micro uppercase tracking-eyebrow text-subtle"
          style={{ animationDelay: "40ms" }}
        >
          {brand.name}
        </p>
        <h1
          className="hero-rise mt-6 text-giant text-ink"
          style={{ animationDelay: "120ms" }}
        >
          Menos tarefas.
          <br />
          <span className="text-aurora">Mais</span> resultado.
        </h1>
        <p
          className="hero-rise mt-8 max-w-xl text-lead text-muted"
          style={{ animationDelay: "240ms" }}
        >
          Automação e software sob medida. Para quem quer crescer sem
          complicar.
        </p>
        <div
          className="hero-rise relative z-10 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          style={{ animationDelay: "340ms" }}
        >
          <WhatsAppLink
            chevron
            className="gap-1 text-lead text-aurora hover:text-aurora-hover"
          />
          <a
            href="#metodo"
            className="inline-flex min-h-11 items-center gap-1 text-lead text-ink-soft hover:text-ink"
          >
            Conhecer o método
            <AppleChevron />
          </a>
        </div>
        <p
          className="hero-rise mt-auto pt-16 text-micro uppercase tracking-eyebrow text-subtle"
          style={{ animationDelay: "480ms" }}
        >
          Sites · Automação · Documentos · Divulgação
        </p>
      </section>

      <section className="px-3 pb-4 sm:px-5">
        <Reveal>
          <figure className="overflow-hidden rounded-tile bg-navy">
            <SafeImg
              src="/images/desk.webp"
              alt="Mesa de trabalho iluminada, com notebook e caderno."
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
          </figure>
          <p className="mx-auto mt-5 max-w-[1120px] px-2 text-sm text-muted sm:px-3">
            Sistemas e automações. De Leopoldina, para o Brasil.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-28 sm:px-8">
        <Reveal>
          <p className="text-micro uppercase tracking-eyebrow text-subtle">O que fazemos</p>
          <ul className="mt-8">
            {services.map((service) => (
              <li
                key={service.id}
                className="border-t border-ink/10 py-6 last:border-b sm:py-8"
              >
                <p className="text-section text-ink">{service.name}.</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-navy text-on-dark">
        <div className="mx-auto grid max-w-[1280px] items-center lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-16 lg:py-20">
            <p className="text-micro uppercase tracking-eyebrow text-on-dark-faint">
              A pergunta
            </p>
            <h2 className="mt-6 max-w-4xl text-display text-on-dark">
              Quanto tempo sua empresa perde fazendo isso todos os dias?
            </h2>
            <p className="mt-8 max-w-lg text-lead text-on-dark-muted">
              Tarefas repetitivas não são produtividade. São tempo que não volta.
            </p>
            <WhatsAppLink
              chevron
              message="Olá, Aurora Digital. Quero automatizar uma tarefa repetitiva."
              className="mt-10 gap-1 text-lead text-snow hover:opacity-80"
            >
              Fale com a Aurora
            </WhatsAppLink>
          </Reveal>
          <DeviceStage className="flex justify-center px-10 pb-8 pt-2">
            <SafeImg
              src="/images/phone-hero-2.webp"
              alt="iPhone com o site da Aurora Digital na tela."
              width={584}
              height={1100}
              loading="lazy"
              decoding="async"
              className="device-face h-64 w-auto sm:h-72 lg:h-80"
            />
          </DeviceStage>
        </div>
      </section>

      <section id="metodo" className="mx-auto max-w-[1120px] scroll-mt-28 px-5 py-28 sm:px-8">
        <Reveal>
          <p className="text-micro uppercase tracking-eyebrow text-subtle">Como funciona</p>
          <h2 className="mt-5 max-w-3xl text-section text-ink">
            Do problema <span className="text-aurora">à solução.</span>
          </h2>
          <ol className="mt-14 max-w-2xl space-y-10">
            {method.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
                <span className="pt-1 font-medium tabular-nums text-aurora">{step.n}</span>
                <div>
                  <p className="text-title text-ink">{step.name}</p>
                  <p className="mt-2 text-body text-muted">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section id="sobre" className="scroll-mt-28 px-5 pb-28 sm:px-8">
        <Reveal className="mx-auto max-w-[1120px]">
          <p className="text-micro uppercase tracking-eyebrow text-subtle">Sobre</p>
          <h2 className="mt-5 max-w-3xl text-display text-ink">{brand.designed}</h2>
          <p className="mt-8 max-w-lg text-lead text-muted">
            Sede em Leopoldina, Minas Gerais. Projetos para empresas em todo o
            país. Você fala com quem faz.
          </p>
          <p className="mt-10 text-sm text-subtle">{brand.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
