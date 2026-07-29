"""Versioned platform information."""

from typing import Annotated

from fastapi import APIRouter, Depends

from nexus_api.api.dependencies import get_settings
from nexus_api.contracts.operational import PlatformInfo
from nexus_api.core.config import Settings

router = APIRouter(tags=["platform"])


@router.get("/platform", response_model=PlatformInfo)
async def platform_information(
    settings: Annotated[Settings, Depends(get_settings)],
) -> PlatformInfo:
    """Describe the implemented foundation without overstating future capability."""
    return PlatformInfo(
        product=settings.product_name,
        short_name=settings.product_short_name,
        version=settings.build_version,
        phase="foundation",
        north_star=(
            "Convert business intent into verifiable software while keeping people "
            "in control and evidence as the source of truth."
        ),
        implemented_capabilities=[
            "versioned-foundation-specification",
            "operational-api",
            "tenant-aware-data-schema",
            "accessible-product-shell",
            "local-reproducible-stack",
        ],
        deferred_capabilities=[
            "discovery-workflows",
            "agent-orchestration",
            "provider-execution",
            "github-automation",
            "staging-deployment",
            "billing",
        ],
    )
