FROM node:10.15.0 AS BUILDER
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM nginx:1.17.6-alpine
WORKDIR /usr/share/nginx/html
COPY --from=BUILDER /usr/src/app/.next .

RUN mv /usr/share/nginx/html/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
