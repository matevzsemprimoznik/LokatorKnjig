FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG MONGO_URI_ARG
ENV MONGO_URI $MONGO_URI_ARG

COPY . .

CMD ["node", "server.js"]