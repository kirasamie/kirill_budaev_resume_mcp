FROM node:24-alpine AS build
WORKDIR /app
ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/common/package.json packages/common/
COPY packages/portfolio-data/package.json packages/portfolio-data/
COPY packages/portfolio-domain/package.json packages/portfolio-domain/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build:all \
  && pnpm --filter api --prod deploy --legacy /deploy

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /deploy ./
EXPOSE 3000
CMD ["node", "dist/main"]
