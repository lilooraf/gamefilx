FROM node:20.4

COPY . /app

WORKDIR /app

RUN yarn install
RUN yarn build
RUN yarn prisma generate