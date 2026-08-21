FROM alpine:3.24 AS build
WORKDIR /app
ENV CI=true
RUN apk add --no-cache nodejs npm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/common/package.json packages/common/
COPY packages/portfolio-data/package.json packages/portfolio-data/
COPY packages/portfolio-domain/package.json packages/portfolio-domain/
RUN npm install -g "$(node -p "require('./package.json').packageManager")" \
  && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build:all \
  && pnpm --filter api --prod deploy --legacy /deploy

FROM alpine:3.24 AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache nodejs \
  && addgroup -S -g 10001 app \
  && adduser -S -D -H -u 10001 -G app app

COPY --chown=10001:10001 --from=build /deploy ./
USER 10001:10001
EXPOSE 3000
CMD ["node", "dist/main"]
