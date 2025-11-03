# @workspace/database

Pacote de banco de dados do Indica Saúde que fornece um cliente type-safe usando Prisma e Prisma Accelerate.

Este pacote oferece:

- Definir o schema do banco de dados de forma declarativa
- Gerar cliente de banco de dados type-safe
- Gerenciar migrações de banco de dados
- Capacidades de query poderosas com suporte completo ao TypeScript
- Singleton pattern para evitar múltiplas conexões
- Validação de variáveis de ambiente em runtime

## Configuração

Por padrão, este pacote usa PostgreSQL como provider de banco de dados e [Prisma](https://prisma.io) como ORM, com suporte ao [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) para melhor performance.

## Uso

O cliente de banco de dados está configurado em `@workspace/database`. Você pode importar este pacote em qualquer componente server-side, assim:

```typescript
import { database } from '@workspace/database'

async function getUsers() {
  const users = await database.user.findMany()
  return users
}
```

Ou se precisar apenas do PrismaClient:

```typescript
import { PrismaClient } from '@workspace/database/client'

// Nota: É recomendado usar o 'database' exportado que já tem
// o singleton pattern e validação de env configurados
```

## Schema

O schema do banco de dados é definido em `packages/database/prisma/schema.prisma`. Este arquivo usa a linguagem de definição de schema do Prisma para descrever suas tabelas, relacionamentos e tipos.

### Modelos principais

O schema atual inclui os seguintes modelos:

- **User**: Usuários do sistema (SUPERADMIN, ADMIN, INDICATOR, PROFESSIONAL)
- **Referral**: Encaminhamentos de pacientes
- **Attendance**: Atendimentos realizados
- **Payment**: Pagamentos realizados
- **Commission**: Comissões para indicadores

### Adicionando um novo modelo

Para adicionar um novo modelo, edite o arquivo `packages/database/prisma/schema.prisma`:

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Aplicando mudanças

Para aplicar mudanças no schema, execute os seguintes comandos:

```bash
# Gerar o cliente Prisma
pnpm prisma:generate

# Criar e aplicar migração
pnpm prisma:migrate

# Ou para resetar o banco (cuidado em produção!)
pnpm fake:data
```

## Scripts disponíveis

- `pnpm prisma:generate` - Gera o cliente Prisma
- `pnpm prisma:migrate` - Cria e aplica uma nova migração
- `pnpm prisma:studio` - Abre o Prisma Studio na porta 3005
- `pnpm fake:data` - Gera dados fake e reseta o banco de dados
- `pnpm typecheck` - Verifica tipos TypeScript

## Editor visual do banco de dados

Para visualizar e editar os registros do banco de dados, use o Prisma Studio:

```bash
pnpm prisma:studio
```

Isso abrirá uma interface web na porta 3005 onde você pode visualizar e editar seus dados.

## Características de implementação

### Singleton Pattern

O cliente de banco de dados implementa um singleton pattern para evitar múltiplas conexões no desenvolvimento. Isso garante que apenas uma instância do PrismaClient seja criada durante o ciclo de vida da aplicação.

### Validação de Variáveis de Ambiente

O pacote valida automaticamente a variável `DATABASE_URL` em runtime usando `@t3-oss/env-nextjs` e `zod`, garantindo que a conexão com o banco de dados só seja estabelecida se todas as variáveis necessárias estiverem configuradas corretamente.

### Prisma Accelerate

O cliente é estendido com `@prisma/extension-accelerate` para melhor performance e cache de queries.

