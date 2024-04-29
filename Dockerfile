FROM node:20

WORKDIR /app

RUN corepack enable

COPY . /app

RUN pnpm install

CMD [ "pnpm", "start:dev" ]