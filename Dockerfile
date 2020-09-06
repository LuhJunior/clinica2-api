FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

COPY ./src ./src

RUN npm ci --quiet 

RUN npm run build

FROM node:lts-alpine as production

ENV NODE_ENV=production

WORKDIR /app

RUN apk add --no-cache bash

RUN npm install -g pm2

COPY package*.json ./

RUN npm ci --quiet --only=production

COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD ["pm2-runtime", "start", "dist/server.js"]