FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG MONGO_URI
ENV MONGO_URI $MONGO_URI

COPY . .

CMD ["node", "server.js"]