# @workspace/next-config

Pacote compartilhado de configuração Next.js para o monorepo Indica Saúde. Centraliza configurações comuns reutilizáveis entre todas as aplicações Next.js.

## 📦 Conteúdo

Este pacote fornece:

- **Configuração base** do Next.js com settings otimizados
- **Validação de variáveis de ambiente** com Zod
- **Helper functions** para análise de bundle e merge de configurações
- **Type-safe exports** para melhor DX

## 🚀 Instalação

Este é um pacote interno do workspace. Instale via pnpm:

```bash
pnpm add @workspace/next-config
```

## 📖 Uso

### Configuração Básica

Use a configuração base e estenda conforme necessário:

```typescript
// next.config.ts
import { config as baseConfig } from '@workspace/next-config'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  ...baseConfig,
  // Suas configurações específicas do app
  reactStrictMode: true,
}

export default nextConfig
```

### Bundle Analyzer

O pacote inclui suporte integrado para análise de bundle. Use a função `withAnalyzer`:

```typescript
import { config as baseConfig, withAnalyzer } from '@workspace/next-config'

const nextConfig = {
  ...baseConfig,
  // suas configs
}

// Bundle analyzer será aplicado automaticamente se ANALYZE=true
export default withAnalyzer(nextConfig)
```

Para ativar o bundle analyzer, defina a variável de ambiente:

```bash
ANALYZE=true pnpm build
```

### Merge de Configurações de Imagens

Quando você precisa adicionar padrões de imagem remotos sem sobrescrever os padrões base:

```typescript
import {
  config as baseConfig,
  mergeImageRemotePatterns,
  withAnalyzer
} from '@workspace/next-config'

const additionalPatterns = [
  {
    protocol: 'https' as const,
    hostname: 'meu-cdn.com'
  }
]

const nextConfig = {
  ...baseConfig,
  images: {
    ...baseConfig.images,
    remotePatterns: mergeImageRemotePatterns(
      baseConfig.images?.remotePatterns,
      additionalPatterns
    )
  }
}

export default withAnalyzer(nextConfig)
```

### Validação de Variáveis de Ambiente

O pacote exporta uma função para validar variáveis de ambiente:

```typescript
import { keys } from '@workspace/next-config'

// Valida e retorna env vars tipadas
const env = keys()
```

**Variáveis de ambiente suportadas:**

#### Server-side (obrigatórias):
- `JWT_SECRET` - Secret para JWT tokens

#### Server-side (opcionais):
- `ANALYZE` - Ativa bundle analyzer quando `'true'`
- `NEXT_RUNTIME` - Runtime do Next.js (`'nodejs'` ou `'edge'`)

#### Client-side (obrigatórias):
- `NEXT_PUBLIC_WEB_URL` - URL pública do app web
- `NEXT_PUBLIC_APP_URL` - URL pública do app principal
- `NEXT_PUBLIC_API_URL` - URL pública da API

## 📚 API Reference

### `config`

Configuração base do Next.js exportada como `NextConfig`.

**Inclui:**
- Image optimization (AVIF, WebP)
- Turbopack rules para SVG
- TypeScript strict mode
- Dev indicators configurados
- Remote image patterns padrão (Clerk, Cloudinary, Microlink, GitHub)

### `withAnalyzer(config: NextConfig): NextConfig`

Aplica bundle analyzer se `ANALYZE=true` estiver definido.

**Parâmetros:**
- `config` - Configuração Next.js

**Retorna:** Configuração Next.js com analyzer aplicado (se habilitado)

### `mergeImageRemotePatterns(base, additional): RemotePattern[]`

Mescla padrões de imagem remotos evitando duplicatas.

**Parâmetros:**
- `base` - Padrões base (do config)
- `additional` - Padrões adicionais

**Retorna:** Array de padrões únicos

### `defaultImageRemotePatterns`

Array de padrões de imagem remotos padrão exportados para reutilização.

### `keys()`

Valida e retorna variáveis de ambiente tipadas com Zod.

## 🏗️ Estrutura do Pacote

```
next-config/
├── index.ts        # Configuração base e helper functions
├── keys.ts         # Validação de env vars
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Desenvolvimento

### Type Check

```bash
pnpm check-types
```

### Limpar Cache

```bash
pnpm clean
```

## 📝 Padrões de Imagem Remotos Padrão

Os seguintes hosts são permitidos por padrão:

- `img.clerk.com` - Clerk authentication
- `res.cloudinary.com` - Cloudinary CDN
- `iad.microlink.io` - Microlink previews
- `github.com` - GitHub assets

Para adicionar mais hosts, use `mergeImageRemotePatterns` ao invés de sobrescrever `remotePatterns`.

## 🎯 Boas Práticas

1. **Sempre use `withAnalyzer`** para manter bundle analyzer disponível
2. **Use `mergeImageRemotePatterns`** ao invés de sobrescrever padrões de imagem
3. **Valide env vars** usando `keys()` antes de usar em produção
4. **Estenda o config base** ao invés de criar do zero

## 🐛 Troubleshooting

### Bundle Analyzer não funciona

Certifique-se de que:
- `ANALYZE=true` está definido no ambiente
- Você está usando `withAnalyzer()` no export do config
- `@next/bundle-analyzer` está instalado (já incluído no pacote)

### Erro de validação de env vars

A função `keys()` lança erro se variáveis obrigatórias não estiverem definidas. Verifique:
- `.env.local` ou `.env` no seu app
- Variáveis definidas no ambiente de execução
- Nomes das variáveis estão corretos

## 📄 Licença

Interno - Uso exclusivo do monorepo Indica Saúde

