# syntax=docker/dockerfile:1
FROM node:16 AS builder
# ビルドには devDependencies もインストールする必要があるため
ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./
# COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16-stretch-slim AS runner
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package.json ./
# COPY yarn.lock ./
# NODE_ENV=productionにしてyarn install(npm install)するとdevDependenciesがインストールされません
RUN yarn install
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start"]