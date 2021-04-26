FROM node:lts-alpine
ARG CIENCIA_ARGENTINA_HOST
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
