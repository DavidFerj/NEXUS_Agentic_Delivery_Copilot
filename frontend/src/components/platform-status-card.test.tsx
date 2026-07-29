import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PlatformStatusCard } from "./platform-status-card";

describe("PlatformStatusCard", () => {
  it("renders implemented capability evidence when ready", () => {
    render(
      <PlatformStatusCard
        status={{
          kind: "ready",
          platform: {
            product: "NEXUS Agentic Delivery Copilot",
            short_name: "NEXUS",
            version: "0.1.0",
            phase: "foundation",
            north_star: "Evidence first.",
            implemented_capabilities: ["api", "web"],
            deferred_capabilities: ["agents"],
          },
        }}
      />,
    );

    expect(screen.getByText("Control plane disponible")).toBeInTheDocument();
    expect(screen.getByText("2 capacidades")).toBeInTheDocument();
  });

  it("explains a degraded dependency state", () => {
    render(
      <PlatformStatusCard
        status={{ kind: "degraded", message: "Database unavailable." }}
      />,
    );

    expect(screen.getByText("Control plane degradado")).toBeInTheDocument();
    expect(screen.getByText("Dependencia en recuperación")).toBeInTheDocument();
  });

  it("explains a completely unavailable API state", () => {
    render(
      <PlatformStatusCard
        status={{ kind: "unavailable", message: "API unavailable." }}
      />,
    );

    expect(screen.getByText("Control plane no disponible")).toBeInTheDocument();
    expect(screen.getByText("Modo de interfaz local")).toBeInTheDocument();
  });
});
