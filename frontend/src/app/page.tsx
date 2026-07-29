import { PlatformStatusCard } from "@/components/platform-status-card";
import { getPlatformStatus } from "@/lib/platform";

const deliveryFlow = [
  { number: "01", label: "Intención", detail: "Problema y outcome" },
  { number: "02", label: "Especificación", detail: "DSP versionado" },
  { number: "03", label: "Construcción", detail: "Workspace aislado" },
  { number: "04", label: "Evidencia", detail: "Tests y seguridad" },
  { number: "05", label: "Staging", detail: "Aceptación humana" },
];

const foundations = [
  {
    eyebrow: "Contrato",
    title: "Spec-driven por diseño",
    copy: "Requisitos, decisiones y criterios viven junto al código y habilitan cada gate.",
  },
  {
    eyebrow: "Control",
    title: "Autonomía progresiva",
    copy: "Los agentes ejecutan dentro de políticas, presupuestos y límites explícitos.",
  },
  {
    eyebrow: "Prueba",
    title: "Evidencia sobre confianza",
    copy: "Ningún cambio está terminado sin build, pruebas, análisis y trazabilidad.",
  },
  {
    eyebrow: "Aislamiento",
    title: "Tenant-aware desde el inicio",
    copy: "Identidad validada, datos con RLS y ejecución separada del control plane.",
  },
];

export default async function Home() {
  const apiBaseUrl = process.env.NEXUS_API_BASE_URL ?? "http://localhost:8000";
  const platformStatus = await getPlatformStatus(fetch, apiBaseUrl);

  return (
    <main>
      <header className="site-header">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="NEXUS, volver al inicio"
        >
          <span className="wordmark-mark" aria-hidden="true">
            N
          </span>
          <span>NEXUS</span>
        </a>
        <div className="header-meta">
          <span className="phase-dot" aria-hidden="true" />
          Foundation · 0.1
        </div>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">Agentic Product &amp; Software Delivery</p>
          <h1 id="hero-title">
            De la intención a staging.
            <span>Con prueba en cada handoff.</span>
          </h1>
          <p className="hero-lede">
            Una plataforma gobernada por personas que conecta discovery,
            especificación, código y delivery sin perder contexto, control ni
            trazabilidad.
          </p>
          <a className="text-link" href="#cimientos">
            Explorar los cimientos <span aria-hidden="true">↓</span>
          </a>
        </div>

        <aside className="north-star" aria-label="North Star del producto">
          <p className="north-star-label">North Star</p>
          <p>
            Convertir intención de negocio en software verificable, manteniendo
            a las personas en control y a la evidencia como fuente de verdad.
          </p>
          <div className="north-star-footer">
            <span>Human governed</span>
            <span>Evidence first</span>
          </div>
        </aside>
      </section>

      <section className="flow-section" aria-labelledby="flow-title">
        <div className="section-heading">
          <p className="kicker">Cadena de valor</p>
          <h2 id="flow-title">
            Un recorrido completo, no módulos desconectados.
          </h2>
        </div>
        <ol className="delivery-flow">
          {deliveryFlow.map((stage) => (
            <li key={stage.number}>
              <span className="flow-number">{stage.number}</span>
              <strong>{stage.label}</strong>
              <span>{stage.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="foundation-section"
        id="cimientos"
        aria-labelledby="foundation-title"
      >
        <div className="section-heading">
          <p className="kicker">Fase 0 · Platform Foundation</p>
          <h2 id="foundation-title">
            Cimientos que hacen segura la velocidad futura.
          </h2>
          <p>
            Esta primera línea base instala contratos, límites y evidencia antes
            de ampliar agentes, proveedores o automatización.
          </p>
        </div>

        <div className="foundation-grid">
          {foundations.map((foundation) => (
            <article key={foundation.title}>
              <p className="card-eyebrow">{foundation.eyebrow}</p>
              <h3>{foundation.title}</h3>
              <p>{foundation.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="operational-section"
        aria-labelledby="operational-title"
      >
        <div className="section-heading compact-heading">
          <p className="kicker">Control plane</p>
          <h2 id="operational-title">La base reporta su estado real.</h2>
          <p>
            La interfaz distingue capacidad implementada de visión futura y
            muestra degradación sin prometer funciones que aún no existen.
          </p>
        </div>
        <PlatformStatusCard status={platformStatus} />
      </section>

      <footer>
        <p>NEXUS Agentic Delivery Copilot</p>
        <p>Local-first · GCP-ready · Producción con gate humano</p>
      </footer>
    </main>
  );
}
