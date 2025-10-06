FROM node:22-alpine

# Defina uma pasta para o binário global do pnpm
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SHELL=/bin/sh

# Usa shell sh explicitamente
SHELL ["/bin/sh", "-c"]

RUN npm install -g pnpm@latest && pnpm setup

WORKDIR /app

COPY ./pnpm-workspace.yaml ./
COPY . .

# Evita erro "no TTY"
ENV CI=true

# Instala dependências do monorepo
RUN pnpm install

# COPY package*.json pnpm-workspace.yaml turbo.json biome.json tsconfig.json ./

# Instala pnpm e turbo globalmente
# RUN npm install -g pnpm@latest && pnpm setup





# RUN npm install -g pnpm@latest && pnpm install -g turbo@latest && pnpm install

# RUN pnpm turbo build

# EXPOSE 3000

# CMD ["pnpm", "dev"]
