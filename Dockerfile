FROM node:lts-alpine AS node-build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run prebuild
RUN pnpm run build

FROM golang:1.26-alpine AS go-build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

COPY . .
COPY --from=node-build /app/server/static /app/server/static
RUN sqlc generate
RUN go build -o app server/main.go

FROM alpine:latest

WORKDIR /app

COPY --from=go-build app .

EXPOSE 8080

CMD ["./app"]
