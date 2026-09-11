import { Reveal } from "@/components/reveal";
import { AppleChevron } from "@/components/apple-chevron";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { DeviceStage } from "@/components/device-stage";
import { SafeImg } from "@/components/recovery";
import { brand, method, promises, services } from "@/lib/brand";

export function EnterprisePage() {
  return (
    <div className="page-in bg-paper text-ink">
      <div className="border-b border-ink/8 bg-snow">
        <p className="mx-auto max-w-[1120px] px-5 py-2.5 text-center text-sm text-ink-soft sm:px-8">
          Atendimento em todo o Brasil. Escopo claro. Sem letras miúdas.
        </p>
      </div>

      <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <p
          className="hero-rise text-micro uppercase tracking-eyebrow text-subtle"
          style={{ animationDelay: "40ms" }}
        >
          {brand.eyebrow}
        </p>
        <h1
          className="hero-rise mt-6 max-w-5xl text-display text-ink"
          style={{ animationDelay: "120ms" }}
        >
          Software que trabalha. Enquanto você cresce.
        </h1>
        <p
          className="hero-rise mt-7 max-w-xl text-lead text-muted"
          style={{ animationDelay: "240ms" }}
        >
          Sites, automações e sistemas sob medida. Feitos para o seu negócio —
          não o contrário.
        </p>
        <div
          className="hero-rise mt-9 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "320ms" }}
        >
          <WhatsAppLink className="rounded-pill bg-aurora px-5 py-2.5 text-sm font-medium text-snow transition-transform duration-150 ease-out hover:bg-aurora-hover active:scale-[0.96]">
            Pedir orçamento
          </WhatsAppLink>
          <a
            href="#solucoes"
            className="inline-flex min-h-11 items-center gap-1 text-lead text-aurora hover:text-aurora-hover"
          >
            Ver soluções
            <AppleChevron />
          </a>
        </div>

        <dl className="hero-rise mt-16 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3" style={{ animationDelay: "420ms" }}>
          {promises.map((item) => (
            <div key={item.name}>
              <dt className="text-sm font-semibold text-ink">{item.name}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.line}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-3 sm:px-5">
        <Reveal>
          <div className="grid gap-3 lg:grid-cols-5">
            <figure className="overflow-hidden rounded-tile bg-navy lg:col-span-3">
              <SafeImg
                src="/images/desk.webp"
                alt="Estúdio de trabalho da Aurora Digital, com notebook e luz natural."
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="aspect-wide h-full w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden rounded-tile bg-navy lg:col-span-2">
              <SafeImg
                src="/images/hands.webp"
                alt="Mãos trabalhando no teclado, luz da manhã."
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="aspect-photo h-full w-full object-cover lg:aspect-auto"
              />
            </figure>
          </div>
        </Reveal>
      </section>

      <section id="solucoes" className="mx-auto max-w-[1120px] scroll-mt-28 px-5 py-28 sm:px-8">
        <Reveal>
          <p className="text-micro uppercase tracking-eyebrow text-subtle">Soluções</p>
          <h2 className="mt-4 max-w-3xl text-section text-ink">
            Completas para o seu negócio.
          </h2>
          <ul className="mt-12">
            {services.map((service) => (
              <li
                key={service.id}
                className="grid gap-2 border-t border-ink/10 py-8 last:border-b sm:grid-cols-[minmax(0,0.9fr)_1.1fr] sm:items-baseline sm:gap-10 sm:py-10"
              >
                <p className="text-title text-ink">{service.title}</p>
                <p className="text-body text-muted">{service.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-navy text-on-dark">
        <div className="mx-auto grid max-w-[1280px] items-center lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-16 lg:py-20">
            <p className="text-micro uppercase tracking-eyebrow text-on-dark-faint">
              O custo invisível
            </p>
            <h2 className="mt-5 text-section text-on-dark">
              Quanto tempo sua empresa perde fazendo isso todos os dias?
            </h2>
            <p className="mt-6 max-w-md text-lead text-on-dark-muted">
              Tarefas repetitivas não são produtividade. São tempo desperdiçado.
              Automatize. Ganhe tempo. Foque no que importa.
            </p>
            <WhatsAppLink
              chevron
              message="Olá, Aurora Digital. Quero automatizar uma tarefa repetitiva."
              className="mt-10 w-fit gap-1 text-lead text-snow hover:opacity-80"
            >
              Fale com a Aurora
            </WhatsAppLink>
          </Reveal>
          <DeviceStage className="flex justify-center px-10 pb-8 pt-2">
            <SafeImg
              src="/images/laptop-hero-2.webp"
              alt="Notebook com o site da Aurora Digital na tela."
              width={894}
              height={713}
              loading="lazy"
              decoding="async"
              className="device-face h-64 w-auto sm:h-72 lg:h-80"
            />
          </DeviceStage>
        </div>
      </section>

      <section id="metodo" className="mx-auto max-w-[1120px] scroll-mt-28 px-5 py-28 sm:px-8">
        <Reveal>
          <p className="text-micro uppercase tracking-eyebrow text-subtle">Método</p>
          <h2 className="mt-4 max-w-3xl text-section text-ink">
            Do problema <span className="text-aurora">à solução.</span>
          </h2>
          <p className="mt-5 max-w-lg text-body text-muted">
            Processos manuais viram sistemas. Em quatro passos. Sem cerimônia.
          </p>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-tile bg-line sm:grid-cols-2">
            {method.map((step) => (
              <li key={step.n} className="bg-snow p-7 sm:p-9">
                <p className="font-medium tabular-nums text-aurora">{step.n}</p>
                <p className="mt-5 text-title text-ink">{step.name}</p>
                <p className="mt-3 text-body text-muted">{step.line}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section id="sobre" className="scroll-mt-28 bg-snow px-5 py-28 sm:px-8">
        <Reveal className="mx-auto max-w-[1120px]">
          <p className="text-micro uppercase tracking-eyebrow text-subtle">Sobre</p>
          <h2 className="mt-4 max-w-4xl text-section text-ink">
            Você fala com quem faz.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className="space-y-6 text-lead text-muted">
              <p>
                A Aurora Digital desenvolve sistemas, sites e automações sob
                medida. Sem a estrutura pesada de uma grande agência. Sem a
                improvisação de um freelancer distante.
              </p>
              <p>
                Sede em Leopoldina, Minas Gerais. Atendemos empresas em todo o
                Brasil — com o mesmo cuidado de quem está do outro lado da mesa.
              </p>
              <p className="text-ink">{brand.designed}</p>
            </div>
            <div className="overflow-hidden rounded-tile">
              <SafeImg
                src="/images/light.webp"
                alt="Luz da manhã sobre uma parede clara."
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-photo w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-28 sm:px-8">
        <Reveal className="mx-auto max-w-[1120px] text-center">
          <h2 className="text-section text-ink">Sua ideia começa aqui.</h2>
          <p className="mx-auto mt-5 max-w-md text-lead text-muted">
            Um toque. A Aurora devolve um caminho — com prazo, escopo e valor.
          </p>
          <WhatsAppLink className="mt-10 min-h-12 rounded-pill bg-navy px-6 py-2.5 text-body font-medium text-on-dark transition-transform duration-150 ease-out hover:bg-navy-2 active:scale-[0.96]">
            Fale no WhatsApp
          </WhatsAppLink>
        </Reveal>
      </section>
    </div>
  );
}
