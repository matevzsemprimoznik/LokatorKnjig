FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG MONGO_URI_ARG
ENV MONGO_URI $MONGO_URI_ARG

ARG SERVICE_KEY_ARG
ENV SERVICE_KEY $SERVICE_KEY_ARG

COPY . .

CMD ["node", "server.js"]