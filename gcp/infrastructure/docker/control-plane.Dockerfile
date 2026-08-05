FROM python:3.14.5-slim-bookworm

ARG UV_VERSION=0.8.3

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

RUN groupadd --system nexus \
    && useradd --system --gid nexus --create-home nexus \
    && python -m pip install --no-cache-dir "uv==${UV_VERSION}"

WORKDIR /workspace

COPY pyproject.toml uv.lock ./
COPY gcp/services/control-plane gcp/services/control-plane
RUN uv sync --frozen --package nexus-control-plane --no-dev

ENV PATH="/workspace/.venv/bin:${PATH}" \
    PYTHONPATH="/workspace/gcp/services/control-plane/src"

USER nexus
WORKDIR /workspace/gcp/services/control-plane

EXPOSE 8000

CMD ["uvicorn", "nexus_api.api.app:create_app", "--factory", "--host", "0.0.0.0", "--port", "8000"]
