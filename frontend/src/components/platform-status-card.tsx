import type { PlatformStatus } from "@/lib/platform";

export function PlatformStatusCard({
  status,
}: Readonly<{ status: PlatformStatus }>) {
  if (status.kind === "ready") {
    return (
      <article className="status-card status-ready" aria-live="polite">
        <div>
          <p className="status-label">
            <span aria-hidden="true" />
            Control plane disponible
          </p>
          <h3>{status.platform.short_name} foundation</h3>
          <p>Versión {status.platform.version} · Contrato API v1</p>
        </div>
        <dl>
          <div>
            <dt>Implementado</dt>
            <dd>
              {status.platform.implemented_capabilities.length} capacidades
            </dd>
          </div>
          <div>
            <dt>Fase</dt>
            <dd>{status.platform.phase}</dd>
          </div>
        </dl>
      </article>
    );
  }

  const degraded = status.kind === "degraded";
  return (
    <article
      className={`status-card ${degraded ? "status-degraded" : "status-unavailable"}`}
      role="status"
    >
      <div>
        <p className="status-label">
          <span aria-hidden="true" />
          {degraded ? "Control plane degradado" : "Control plane no disponible"}
        </p>
        <h3>
          {degraded ? "Dependencia en recuperación" : "Modo de interfaz local"}
        </h3>
        <p>{status.message}</p>
      </div>
      <p className="status-action">
        {degraded
          ? "La API responde, pero una dependencia requerida no está lista."
          : "Inicia el servicio API para habilitar el estado operativo."}
      </p>
    </article>
  );
}
