# Red Hat UBI Minimal with Node.js
FROM registry.access.redhat.com/ubi9/ubi-minimal:9.7-1768783948

# Set environment variables
ENV NODE_VERSION=24.12.0 \
    PATH=/usr/local/bin:$PATH

# Install required packages for downloading and extracting, plus basic utilities
RUN microdnf install -y \
    ca-certificates \
    findutils \
    gzip \
    net-tools \
    procps-ng \
    tar \
    vi \
    xz \
    which \
    && microdnf clean all

# ============================================================
# Download and install Node.js 24.12 LTS (ARM64)
# ============================================================
RUN curl -fsSL https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-arm64.tar.xz -o /tmp/node.tar.xz && \
    tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1 && \
    rm /tmp/node.tar.xz

# Verify installation
RUN node --version && npm --version

# ============================================================
# Install pandoc
# ============================================================
RUN rpm -ivh https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm

RUN microdnf install -y \
    pandoc \
    && microdnf clean all


# Set working directory
WORKDIR /work

# Default command
CMD ["/bin/bash"]
