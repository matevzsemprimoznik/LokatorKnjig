FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACKEND_URI_ARG

ENV REACT_APP_BACKEND_URI=$BACKEND_URI_ARG

RUN npm run build

FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

COPY --from=build /app/build /usr/share/nginx/html


CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
