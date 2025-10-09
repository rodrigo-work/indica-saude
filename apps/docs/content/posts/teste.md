---
layout: post
date: 2025-10-09 04:02:00
title: teste
description: teste
---
teste

# Referral MVP — Documentação

> Documentação do projeto *referral-mvp* — explicação do sistema, fluxos, endpoints, diagramas (Mermaid), passos para rodar, testes e próximos passos.

- - -

## 1. Visão Geral

O `Referral MVP` é um sistema para gerenciar encaminhamentos (referrals) entre indicadores, profissionais e usuários/pacientes. Ele inclui cadastro de usuários, criação de referrals, agendamento, status do encaminhamento e integração com notificações/agenda.

Objetivos principais:

* Registrar encaminhamentos com status (PENDING, SCHEDULED, COMPLETED).
* Permitir que profissionais e administradores visualizem e atualizem o status.
* Expor API RESTful para frontend (Next.js/React) e possivelmente microservices.
* Facilitar autenticação via JWT/Cognito (ou outro provedor).

- - -

## 2. Principais entidades (modelo lógico)

Abaixo está o modelo de dados em alto nível (ER). Ajuste os nomes conforme seu `schema.prisma`.

```mermaid
erDiagram
    User {
        UUID id PK
        String name
        String email
        Role role
        DateTime createdAt
    }

    Professional {
        UUID id PK
        String name
        String specialty
        UUID userId FK
    }

    Referral {
        UUID id PK
        String code
        UUID patientId FK
        UUID indicatorId FK
        UUID professionalId FK
        ReferralStatus status
        DateTime createdAt
        DateTime? scheduledAt
        String? notes
    }

    User ||--o{ Professional : "pode_ser"
    User ||--o{ Referral : "criou/recebeu"
    Professional ||--o{ Referral : "atende"
```

- - -

## 3. Enumerações sugeridas

```text
enum Role { ADMIN, INDICATOR, PROFESSIONAL }
enum ReferralStatus { PENDING, SCHEDULED, COMPLETED }
```

- - -

## 4. Endpoints principais (API REST)

### Autenticação

* `POST /auth/login` — recebe email/senha ou token do provedor, retorna `{ accessToken, refreshToken, idToken }`.
* `POST /auth/refresh` — troca refresh token por novo access token.

### Usuários

* `GET /users` — (admin) lista usuários.
* `GET /users/:id` — detalhes do usuário.
* `POST /users` — cria usuário.

### Professionals

* `GET /professionals`
* `POST /professionals`

### Referrals

* `GET /referrals` — lista com filtros (`status`, `indicatorId`, `professionalId`, `createdFrom`, `createdTo`).
* `GET /referrals/:id` — detalhes.
* `POST /referrals` — cria referral.
* `PUT /referrals/:id` — atualiza campos (status, scheduledAt, notes).
* `DELETE /referrals/:id` — remove (soft-delete preferível).

#### Exemplo: criar referral

Request `POST /referrals`

```json
{
  "patientId": "uuid",
  "indicatorId": "uuid",
  "professionalId": "uuid",
  "notes": "Observações",
}
```

Response `201`

```json
{
  "id": "uuid",
  "code": "REF-2025-0001",
  "status": "PENDING",
  "createdAt": "2025-10-06T..."
}
```

- - -

## 5. Fluxos principais (Mermaid)

### 5.1 Fluxo de criação de referral

```mermaid
sequenceDiagram
  participant Indicator
  participant API
  participant DB
  participant NotificationService

  Indicator->>API: POST /referrals {patientId, professionalId, notes}
  API->>DB: CREATE referral (status=PENDING)
  DB-->>API: referral(created)
  API->>NotificationService: notify(professional)
  API-->>Indicator: 201 Created (referral)
```

### 5.2 Fluxo de agendamento

```mermaid
sequenceDiagram
  participant Professional
  participant API
  participant DB
  participant CalendarService

  Professional->>API: PUT /referrals/:id {status: SCHEDULED, scheduledAt}
  API->>DB: UPDATE referral
  DB-->>API: referral(updated)
  API->>CalendarService: createEvent(referral)
  API-->>Professional: 200 OK
```

### 5.3 Autenticação com JWT (fluxo)

```mermaid
sequenceDiagram
  participant Client
  participant AuthServer
  participant API

  Client->>AuthServer: POST /auth/login (credentials)
  AuthServer-->>Client: {accessToken, refreshToken}
  Client->>API: GET /referrals (Authorization: Bearer accessToken)
  API->>AuthServer: validate(accessToken)
  AuthServer-->>API: valid
  API-->>Client: 200 OK (data)
```

- - -

## 6. Arquitetura recomendada

```mermaid
flowchart TB
  subgraph Backend
    API[API (Node.js/Express/TS)] --> DB[(Postgres)]
    API --> Auth[Auth Service/Cognito]
    API --> Notifications[Notification Service]
    API --> Calendar[Calendar Service]
  end

  subgraph Frontend
    Web[Next.js App] --> API
    Mobile[Expo/React Native] --> API
  end
```

Notas:

* Use Redis para cache e rate-limiting.
* Use filas (RabbitMQ / SQS) para tarefas que enviam notificações e criam eventos no calendário.
* Use testes unitários e integração com Jest/Playwright.

- - -

## 7. Configuração e execução local

### Requisitos

* Node.js >= 18
* pnpm/yarn/npm
* PostgreSQL 14+
* Docker (opcional: executar postgres em container)

### Variáveis de ambiente (exemplo `.env`)

```
DATABASE_URL=postgresql://admin:password@localhost:5432/referraldb
JWT_SECRET=uma_chave_secreta
PORT=4000
COGNITO_POOL_ID=...
NOTIFICATION_URL=http://localhost:9000
```

### Scripts úteis

```bash
# instalar
pnpm install
# rodar migrations (Prisma)
npx prisma migrate dev --name init
# gerar client prisma
npx prisma generate
# rodar em dev
pnpm dev
# rodar testes
pnpm test
```

- - -

## 8. Observabilidade e monitoramento

* Logs estruturados (JSON) — Winston/Pino.
* Métricas — Prometheus + Grafana.
* Tracing — OpenTelemetry.
* Alertas para filas atrasadas, erros 5xx, latência alta.

- - -

## 9. Segurança

* Tudo via HTTPS em produção.
* Validar e sanitizar inputs.
* Rate limit nos endpoints sensíveis.
* Armazenar refresh tokens com segurança (httpOnly cookies) ou em DB com expirations.
* Proteção contra RBAC: checar `Role` antes de ações administrativas.

- - -

## 10. Testes e QA

* Unit tests para services e controllers (Jest).
* Integration tests para endpoints (supertest).
* E2E para fluxos críticos (Playwright).

- - -

## 11. Estrutura de pastas sugerida

```
/referral-mvp
  /apps
    /api
    /web
  /packages
    /db (Prisma schema)
    /auth
    /shared (types, utils)
  docker-compose.yml
  .env.example
  README.md
```

- - -

## 12. CI/CD (sugestão)

* GitHub Actions pipeline:

  1. Lint (ESLint + Prettier)
  2. Test (unit + integration)
  3. Build
  4. Deploy (staging -> production) usando Terraform/CloudFormation ou serverless deploy

- - -

## 13. Checklist para MVP

* CRUD básico de referrals
* Autenticação (JWT)
* Listagem e filtros
* Notificações (fila + serviço)
* Integração calendar
* Tests e cobertura >= 80%

- - -

## 14. Próximos passos e melhorias

1. Implementar fila para notificações e envio de e-mail/SMS.
2. Integração com serviços de calendário (Google Calendar/Microsoft).
3. Painel administrativo (relatórios, métricas).
4. Localização/Tradução (i18n).

- - -

## 15. Referências rápidas

* Prisma ORM — modelagem e migrations
* OpenTelemetry, Prometheus, Grafana — observabilidade
* AWS SQS / RabbitMQ — filas
* Cognito / Auth0 — provedor de auth

- - -

> Se quiser, eu posso:
>
> * Gerar o `README.md` final já com instruções passo-a-passo para deploy em AWS/GCP
> * Criar os arquivos `schema.prisma`, `docker-compose.yml` e um esqueleto do backend (Express + TypeScript)
> * Gerar diagramas em PNG/SVG e um ZIP com tudo pronto

*Documento gerado automaticamente — ajuste nomes de rotas, variáveis e detalhes técnicos conforme o código existente.*
