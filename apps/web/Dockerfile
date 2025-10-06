# Etapa base com node + pnpm
FROM node:20-alpine AS base
WORKDIR /app

# Copiar os arquivos principais da raiz do monorepo
COPY ./pnpm-workspace.yaml ./
# COPY ../package.json ../pnpm-lock.yaml ./

# # Copiar todos os pacotes do monorepo (ajuste caminhos conforme necessário)
# COPY ../packages ./packages
# COPY ../apps ./apps

COPY . .

# Instalar pnpm e dependências da workspace
RUN npm install -g pnpm
#     && pnpm install --frozen-lockfile

# Definir a pasta do app (ajuste se necessário)
# WORKDIR /app/apps/web

# Rodar o app
CMD ["pnpm -v"]
