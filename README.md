# nerv

A tiny TypeScript + Express + Redis service for docker sandbox validation.

## Stack

- Node.js
- TypeScript
- Express
- Redis
- Vitest
- Docker Compose

## Project layout

```text
.
├── Dockerfile
├── Makefile
├── README.md
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── src
│   ├── app.ts
│   ├── server.ts
│   └── store.ts
└── test
    └── app.test.ts
```

## Requirements

- Node.js 22+
- npm
- Docker
- Docker Compose

## Local development

Install dependencies:

```bash
npm install
```

Run the app in dev mode:

```bash
npm run dev
```

By default the app listens on port `3000`.

Set Redis if you are not using Docker Compose:

```bash
export REDIS_URL=redis://localhost:6379
```

## Tests

Run tests once:

```bash
npm test
```

Vitest supports running tests from the `test` script, and `vitest run` is the standard one-shot mode for non-watch execution. [web:409]

## Build

Compile TypeScript:

```bash
npm run build
```

Run the compiled server:

```bash
node dist/src/server.js
```

## Docker

Build and start the app and Redis:

```bash
docker compose up --build
```

Compose is designed to start the full multi-service application from a single command once the Dockerfile and compose file are defined. [web:510]

## Endpoints

- `GET /`
- `GET /health`
- `PUT /kv/:key`
- `GET /kv/:key`

Example write:

```bash
curl -X PUT http://localhost:3000/kv/demo \
  -H 'content-type: application/json' \
  -d '{"value":"hello"}'
```

Example read:

```bash
curl http://localhost:3000/kv/demo
```

## Make targets

```bash
make install
make build
make test
make dev
make up
make down
make logs
make clean
```
