FROM node:lts-alpine
ENV CIENCIA_ARGENTINA_HOST=localhost
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
