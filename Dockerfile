FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY test ./test

RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
